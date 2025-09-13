// app/index.tsx
//--------------------------------------------------------------------------------------
// App (루트 화면)
// - 전역 Provider(SafeArea/Jotai)와 부팅 로직(Boot)을 감싸고
// - 상단: 캘린더 헤더 + 그리드(월 전환)
// - 하단: 선택일에 대한 이벤트 리스트
// - 월/연 상태만 이 컴포넌트에 두고, 도메인 상태(이벤트/선택일)는 jotai로 관리
//--------------------------------------------------------------------------------------

import { Provider } from "jotai";
import React, { useState, useCallback } from "react";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Boot } from "../src/boot/Boot";
import CalendarGrid from "../src/components/calendar/CalendarGrid";
import { CalendarHeader } from "../src/components/calendar/CalendarHeader";
import EventList from "../src/components/list/EventList";
import { theme } from "../src/theme";

export default function App() {
    // 월/연은 화면 네비게이션 컨텍스트에 종속적이므로 로컬 상태로 관리
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month0, setMonth0] = useState(today.getMonth()); // 0=Jan

    // 이전 달로 전환
    const prev = useCallback(() => {
        if (month0 === 0) {
            setYear((y) => y - 1);
            setMonth0(11);
        } else {
            setMonth0((m) => m - 1);
        }
    }, [month0]);

    // 다음 달로 전환
    const next = useCallback(() => {
        if (month0 === 11) {
            setYear((y) => y + 1);
            setMonth0(0);
        } else {
            setMonth0((m) => m + 1);
        }
    }, [month0]);

    return (
        // jotai: 전역 상태(이벤트/선택일) 제공
        <Provider>
            {/* safe-area: 기기별 상/하 안전영역 처리 */}
            <SafeAreaProvider>
                {/* Boot: 최초 1회 로딩(로컬 JSON→eventsAtom 등) */}
                <Boot />
                {/* 루트 레이아웃: 상단(캘린더) / 하단(리스트) 2단 구성 */}
                <SafeAreaView
                    style={{ flex: 1, backgroundColor: theme.colors.surface }}
                >
                    {/* 상단: 헤더 + 그리드
                        - 헤더: 연/월 표시 + 이전/다음 전환
                        - 그리드: 월 달력(윤년/6주 처리/도트표시 등) */}
                    <View
                        style={{
                            paddingBottom: 12 /* 그리드와 리스트 경계 여백 */,
                        }}
                    >
                        <CalendarHeader
                            year={year}
                            month0={month0}
                            onPrev={prev}
                            onNext={next}
                        />
                        <CalendarGrid year={year} month0={month0} />
                    </View>

                    <View
                        style={{
                            flex: 1,
                            borderTopWidth: 1,
                            borderColor: theme.colors.border,
                            backgroundColor: theme.colors.background, // 리스트 영역 바탕색
                        }}
                    >
                        <EventList />
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        </Provider>
    );
}
