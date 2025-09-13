// src/components/calendar/CalendarGrid.tsx
//--------------------------------------------------------------------------------------------------
// CalendarGrid
// - 월 단위 달력 그리드(요일 헤더 + 날짜 셀)
// - 날짜 셀에는 "해당 날짜와 겹치는 이벤트 수만큼" dot 를 찍되, 최대 8개로 제한
// - 선택일/오늘 표시, 외부월 흐림 처리
// - 퍼포먼스: 월 매트릭스/도트맵 메모이제이션
// - 접근성: 날짜/이벤트 수를 라벨로 노출
//--------------------------------------------------------------------------------------------------

import React, { useMemo, memo, useCallback } from "react";
import { View, Pressable, Text, Platform } from "react-native";
import { useAtom, useAtomValue } from "jotai";

import { getMonthMerix, overlapsDay, toYMD } from "../../utils/dateUtil";
import {
    eventsAtom,
    selectedDateAtom,
    type EventItem,
} from "../../atoms/calendar";
import { theme } from "../../theme";
import CalendarWeekdaysHeader from "./CalendarWeekDaysHeader";
import CalendarDots from "./CalendarDots";
import { TYPE_COLOR } from "../../constants/calendar";

type Props = {
    year: number;
    month0: number; // 0 = Jan
    calendarHeight?: number; // 본문 영역 고정 높이(행을 flex:1로 균등 분배)
};

function CalendarGridBase({ year, month0, calendarHeight = 300 }: Props) {
    // 선택일은 문자열 키("YYYY-MM-DD")로 통일해 비교 비용/실수를 줄인다.
    const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);

    // 전역 이벤트(읽기 전용). 타입을 명시해 이후 로직에서 any를 피한다.
    const eventsRaw = useAtomValue(eventsAtom) as unknown;
    const events: EventItem[] = Array.isArray(eventsRaw)
        ? (eventsRaw as EventItem[])
        : [];

    // 1) 해당 월의 주차 × 요일 매트릭스(앞/뒤 여백 포함)
    const matrix = useMemo(() => getMonthMerix(year, month0), [year, month0]);

    // 2) 화면에 "실제로 보이는 날짜 키"를 한 번에 뽑아놓는다.
    //    - 도트맵 계산에서 반복 재생성을 피하기 위함
    const visibleKeys = useMemo(() => {
        const keys: string[] = [];
        for (const week of matrix)
            for (const { date } of week) keys.push(toYMD(date));
        return keys;
    }, [matrix]);

    // 3) 날짜별 dot 색 배열을 계산한다. (최대 8개)
    //    - 단순/명확성을 우선: key 기준 루프 → 해당 키와 겹치는 이벤트를 필터
    //    - 이벤트 수가 매우 커질 경우 월 범위로 한 번 더 프리필터링하는 최적화 여지가 있다.
    const dotMap = useMemo(() => {
        const map = new Map<string, string[]>();
        for (const key of visibleKeys) {
            const todays = events.filter((e) => overlapsDay(e, key));
            const colors = todays
                .map((e) => TYPE_COLOR[e.type ?? "OTHER"])
                .slice(0, 8);
            map.set(key, colors);
        }
        return map;
    }, [events, visibleKeys]);

    const todayKey = toYMD(new Date());

    // 셀 터치 핸들러: 콜백으로 고정해 불필요한 재생성을 줄인다.
    const onPressCell = useCallback(
        (key: string) => {
            setSelectedDate(key);
        },
        [setSelectedDate]
    );

    return (
        <View style={{ paddingHorizontal: 12 }}>
            {/* 요일 헤더: 고정 높이로 레이아웃 안정 */}
            <View
                style={{
                    height: 28,
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 6,
                }}
            >
                <CalendarWeekdaysHeader />
            </View>

            {/* 달력 본문: 주(행)를 flex:1로 균등 분배해 5/6주 모두 안정 */}
            <View style={{ height: calendarHeight }}>
                {matrix.map((week, wi) => (
                    <View
                        key={`w-${wi}`}
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            borderColor: theme.colors.border,
                        }}
                    >
                        {week.map(({ date, inMonth }, di) => {
                            const key = toYMD(date);
                            const isSelected = key === selectedDate; // 선택일은 문자열 키로 직접 비교
                            const isToday = key === todayKey;
                            const dots = dotMap.get(key) ?? [];

                            const a11yLabel = `${date.getDate()}일, 일정 ${
                                dots.length
                            }건`;

                            return (
                                <Pressable
                                    key={`d-${wi}-${di}`} // 주차/열 조합으로 유니크 보장
                                    onPress={() => onPressCell(key)}
                                    android_ripple={{
                                        color: "rgba(0,0,0,0.08)",
                                        borderless: false,
                                    }}
                                    style={({ pressed }) => [
                                        {
                                            flex: 1,
                                            minHeight: 42,
                                            minWidth: 42,
                                            paddingTop: 4,
                                            margin: 2, // 셀 간격(시각적으로 공간감 부여)
                                            alignItems: "center",
                                            justifyContent: "flex-start",
                                            borderRadius: 8,
                                            backgroundColor: isSelected
                                                ? "#e0f2ff"
                                                : "transparent",
                                            opacity: inMonth ? 1 : 0.4,
                                            borderWidth: isToday ? 1 : 0,
                                            borderColor: isToday
                                                ? "#94a3b8"
                                                : "transparent",
                                        },
                                        Platform.OS === "ios" && pressed
                                            ? { backgroundColor: "#f3f4f6" }
                                            : null,
                                    ]}
                                    hitSlop={8}
                                    accessibilityRole="button"
                                    accessibilityLabel={a11yLabel}
                                >
                                    {/* 날짜 숫자 */}
                                    <Text style={{ fontSize: 14 }}>
                                        {date.getDate()}
                                    </Text>

                                    {/* 이벤트 점: 최대 8개, 2줄 래핑(컴포넌트 내부에서 레이아웃 고정) */}
                                    <CalendarDots dots={dots} />
                                </Pressable>
                            );
                        })}
                    </View>
                ))}
            </View>
        </View>
    );
}

//  같은 props/상태에서 불필요한 리렌더 방지
const CalendarGrid = memo(CalendarGridBase);
export default CalendarGrid;
