// src/components/EventList.tsx
import React, { useCallback, useMemo } from "react";
import { View, Text, FlatList } from "react-native";
import { useAtomValue } from "jotai";
import {
    EventItem,
    eventsBySelectedDateAtom,
    selectedDateAtom,
} from "../../atoms/calendar";
import { formatKoreanTime, WEEKDAYSLabel } from "../../utils/dateUtil";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Title } from "../text/Title";
import { EventListItem } from "./EventListItem";
import EmptySign from "./EmptySign";
export default function EventList() {
    const selectedDate = useAtomValue(selectedDateAtom);
    const listRaw = useAtomValue(eventsBySelectedDateAtom) as any;
    const list = Array.isArray(listRaw) ? listRaw : listRaw ? [listRaw] : [];

    const headerTitle = `${selectedDate} (${WEEKDAYSLabel(selectedDate)})`; // ✅ 요일 추가

    // 정렬: allDay > 시작시간 > 제목
    const data = useMemo(() => {
        const toMin = (t?: string) => {
            const m = t?.match(/^(\d{1,2}):(\d{2})$/);
            return m
                ? Number(m[1]) * 60 + Number(m[2])
                : Number.POSITIVE_INFINITY;
        };
        return [...list].sort((a, b) => {
            const ad = a.allDay ? 0 : 1,
                bd = b.allDay ? 0 : 1;
            if (ad !== bd) return ad - bd;
            const am = toMin(a.timeStart),
                bm = toMin(b.timeStart);
            if (am !== bm) return am - bm;
            return (a.title ?? "").localeCompare(b.title ?? "");
        });
    }, [list]);

    const ItemSeparator = useCallback(() => <View style={{ height: 8 }} />, []);
    const onPressItem = useCallback((id: string) => {
        router.push({ pathname: "/event/[id]", params: { id } });
    }, []);

    const renderItem = useCallback(
        ({ item }: { item: EventItem }) => {
            const time = item.allDay
                ? "하루 종일"
                : item.timeStart || item.timeEnd
                ? [
                      formatKoreanTime(item.timeStart),
                      formatKoreanTime(item.timeEnd),
                  ]
                      .filter(Boolean)
                      .join(" ~ ")
                : "시간 미정";

            return (
                <EventListItem
                    title={item.title}
                    time={time}
                    location={item.location}
                    type={item.type}
                    onPress={() => onPressItem(item.id)}
                />
            );
        },
        [onPressItem]
    );

    return (
        <SafeAreaView
            edges={["bottom"]}
            style={{ padding: 12, gap: 8, flex: 1 }}
        >
            <View style={{ paddingHorizontal: 12 }}>
                <Title text={headerTitle} />
            </View>
            <FlatList
                data={data}
                keyExtractor={(e) => e.id}
                renderItem={renderItem}
                ItemSeparatorComponent={ItemSeparator}
                ListEmptyComponent={<EmptySign />}
                contentContainerStyle={{
                    paddingHorizontal: 12,
                    paddingBottom: 12,
                }}
                showsVerticalScrollIndicator={false}
                initialNumToRender={12}
                windowSize={8}
                removeClippedSubviews
            />
        </SafeAreaView>
    );
}
