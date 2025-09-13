import { atom } from "jotai";
import { overlapsDay, toYMD } from "../utils/dateUtil";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type EventItem = {
    id: string;
    date: string; // 'YYYY-MM-DD'
    title: string;
    content?: string;
    type?: "MEETING" | "VISIT" | "DELIVERY" | "OTHER";
    allDay?: boolean;
    location?: string;

    timeStart?: string; // 'HH:mm'
    timeEnd?: string;

    rangeStart?: string; // '2025-09-06T23:00:00'
    rangeEnd?: string;
};

const storage = createJSONStorage<EventItem[]>(() => AsyncStorage);
//동기 보장
export const eventsAtom = atomWithStorage<EventItem[]>("events", [], storage, {
    getOnInit: true,
});

//오늘 날짜를 기본값으로
export const selectedDateAtom = atom<string>(toYMD(new Date()));

//선택한 상세 데이터
export const selectedEventIdAtom = atom<string | null>(null);

//선택한 날짜의 이벤트만 저장되도록
export const eventsBySelectedDateAtom = atom((get) => {
  const all = get(eventsAtom) as EventItem[];     // 저장소
  const selected = get(selectedDateAtom);         // "YYYY-MM-DD"
  const arr = Array.isArray(all) ? all : [];
  return arr.filter((e) => overlapsDay(e, selected));
});