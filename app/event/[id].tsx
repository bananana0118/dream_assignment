// app/event/[id].tsx
//-------------------------------------------------------------------------------------------------
// EventDetailScreen
// - 일정 상세 읽기 전용 화면
// - 데이터 파싱/검증 → 헤더(제목/배지) → 메타(날짜/시간) → 본문(장소/메모) 순서로 구성
//-------------------------------------------------------------------------------------------------

import { useLocalSearchParams, Stack } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAtomValue } from "jotai";
import { eventsAtom, type EventItem } from "../../src/atoms/calendar";
import { theme } from "../../src/theme";
import SectionCard from "../../src/components/card/SectionCard";
import React from "react";
import DetailHeader from "../../src/components/detail/DetailHeader";
import Divider from "../../src/components/detail/Divider";
import DetailMeta from "../../src/components/detail/DetailMeta";
import NotFoundView from "../../src/components/detail/NotFoundView";

export default function EventDetailScreen() {
    // 1) 파라미터 파싱
    const { id } = useLocalSearchParams<{ id?: string }>();

    // 2) 전역 상태(이벤트 목록)에서 대상 찾기
    const all = useAtomValue(eventsAtom) as EventItem[] | unknown;
    const list = Array.isArray(all) ? (all as EventItem[]) : [];
    const item = id ? list.find((e) => e.id === id) : undefined;

    // 3) 가드: 없는 경우 즉시 NotFound
    const notFound = !item;

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.colors.surface }}
        >
            {/* 네비게이션 타이틀: 라우팅 레벨에서 관리 */}
            <Stack.Screen options={{ title: "일정 상세" }} />

            {notFound ? (
                <NotFoundView />
            ) : (
                <ScrollView
                    contentContainerStyle={{
                        padding: theme.spacing(4),
                        paddingBottom: theme.spacing(6),
                        gap: theme.spacing(3),
                        backgroundColor: theme.colors.background,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* 4) 헤더: 제목 + 배지 */}
                    <DetailHeader
                        title={item!.title}
                        type={item!.type}
                        allDay={!!item!.allDay}
                    />

                    {/* 5) 날짜/시간 메타 블록 */}
                    <DetailMeta
                        date={item!.date}
                        allDay={!!item!.allDay}
                        timeStart={item!.timeStart}
                        timeEnd={item!.timeEnd}
                    />

                    {/* 6) 구분선 */}
                    <Divider />

                    {/* 7) 본문 카드: 장소/메모*/}
                    <SectionCard label="장소" content={item!.location || ""} />
                    <SectionCard
                        label="메모"
                        content={(item!.content ?? "").trim()}
                    />
                </ScrollView>
            )}
        </SafeAreaView>
    );
}
