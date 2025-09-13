// utils/dateUtil.ts
import { EventItem } from "../atoms/calendar";
import { WEEKDAYS } from "../constants/calendar";
import { Cells } from "./type";

/** 내부 공통 유틸 */

const toDateOnly = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const addDays = (date: Date, days: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

const parseYMD = (input: Date | string): string => {
  if (input instanceof Date) {
    const year = input.getFullYear();
    const month = String(input.getMonth() + 1).padStart(2, "0");
    const date = String(input.getDate()).padStart(2, "0");
    return `${year}-${month}-${date}`;
  }

  // 문자열 처리: "YYYY-MM-DD", "YYYY/M/D", "YYYY-MM-DDTHH:mm"
  const first10Chars = input.slice(0, 10).replace(/\//g, "-");
  const match = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(first10Chars);

  if (match) {
    const [, year, month, day] = match;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  const parsed = new Date(input);
  if (!isNaN(parsed.getTime())) return parseYMD(parsed);

  // fallback: 오늘 날짜
  return parseYMD(new Date());
};

const toLocalMidnight = (ymd: string) => new Date(`${ymd}T00:00:00`);

const hhmmToMinutes = (hhmm?: string) => {
  const match = hhmm?.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const [, hour, minute] = match;
  return Number(hour) * 60 + Number(minute);
};

const rangesOverlap = (
  startA: number,
  endA: number,
  startB: number,
  endB: number
) => Math.max(startA, startB) < Math.min(endA, endB);

/** "YYYY-MM-DD" → [그 날 00:00, 다음날 00:00) 구간(ms) */
export function dayWindow(ymd: string) {
  const base = toLocalMidnight(ymd);
  const start = toDateOnly(base).getTime();
  const end = addDays(base, 1).getTime();
  return { start, end };
}

/** 이벤트가 특정 ‘하루 구간’과 겹치면 true */
export function overlapsDay(event: EventItem, ymd: string) {
  const { start: dayStart, end: dayEnd } = dayWindow(ymd);

  // 1) 기간 이벤트(range)
  if (event.rangeStart && event.rangeEnd) {
    const eventStart = new Date(event.rangeStart).getTime();
    const eventEnd = new Date(event.rangeEnd).getTime();
    return rangesOverlap(eventStart, eventEnd, dayStart, dayEnd);
  }

  // 2) 단일 일자 이벤트
  if (event.date !== ymd) return false;
  if (event.allDay) return true;

  const startMinutes = hhmmToMinutes(event.timeStart);
  const endMinutes = hhmmToMinutes(event.timeEnd);

  // 시간이 모두 없으면 “그 날에 속하는 일정(시간 미정)”
  if (startMinutes == null && endMinutes == null) return true;

  // 분 단위 [0,1440)에서 유효성 판단
  const start = startMinutes ?? 0;
  const end = endMinutes ?? 24 * 60;
  return start < end;
}

/** 문자열/Date → "YYYY-MM-DD" */
export function toYMD(input: Date | string): string {
  return parseYMD(input);
}

/**
 * month0: 0=1월
 * 달력 셀(앞/뒤 여백 포함)을 7칸씩 끊어 2차원 배열로 반환
 */
export const getMonthMerix = (year: number, monthIndexZeroBased: number) => {
  const firstDateOfMonth = new Date(year, monthIndexZeroBased, 1);
  const firstDayOfWeek = firstDateOfMonth.getDay(); // 0=일요일
  const lastDateOfMonth = new Date(year, monthIndexZeroBased + 1, 0).getDate();
  const lastDateOfPrevMonth = new Date(year, monthIndexZeroBased, 0).getDate();

  const cells: Cells = [];

  // 앞 여백: 지난 달 말일에서 이어붙이기
  for (let i = 0; i < firstDayOfWeek; i++) {
    const date = new Date(
      year,
      monthIndexZeroBased - 1,
      lastDateOfPrevMonth - (firstDayOfWeek - 1 - i)
    );
    cells.push({ date, inMonth: false });
  }

  // 이번 달
  for (let dateNum = 1; dateNum <= lastDateOfMonth; dateNum++) {
    cells.push({ date: new Date(year, monthIndexZeroBased, dateNum), inMonth: true });
  }

  // 뒤 여백: 다음 달 1일부터 필요한 개수만큼
  const remainder = cells.length % 7;
  const need = remainder === 0 ? 0 : 7 - remainder;
  for (let i = 1; i <= need; i++) {
    const date = new Date(year, monthIndexZeroBased + 1, i);
    cells.push({ date, inMonth: false });
  }

  // 주 단위로 분리
  const weeks: Cells[] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
};

/** 요일 라벨 (일~토) */
export function WEEKDAYSLabel(input: Date | string): string {
  const ymd = parseYMD(input);
  const date = toLocalMidnight(ymd);
  return WEEKDAYS[date.getDay()];
}

/** "HH:MM" → "오전/오후 H:MM" */
export function formatKoreanTime(hhmm?: string): string {
  if (!hhmm) return "";
  const [hourStr, minuteStr] = hhmm.split(":");
  const hour = parseInt(hourStr, 10);
  const ampm = hour < 12 ? "오전" : "오후";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${ampm} ${hour12}:${minuteStr.padStart(2, "0")}`;
}
