import React from "react";
import { Text, View } from "react-native";
import { EventItem } from "../../atoms/calendar";
import { theme } from "../../theme";
import { weekdayLabel, formatKoreanTime } from "../../utils/dateUtil";

/** 날짜/시간 메타 정보 묶음 */
export default function DetailMeta({
    date,
    allDay,
    timeStart,
    timeEnd,
}: Pick<EventItem, "date" | "allDay" | "timeStart" | "timeEnd">) {
    // 메모: 주/월 단위 캘린더와 동일 포맷으로 유지해 인지 부하를 줄인다.
    const weekday = React.useMemo(() => weekdayLabel(date), [date]);

    // 메모: allDay가 아니면 "오전/오후" 포맷으로, 둘 중 하나라도 있으면 "~"로 연결
    const timeLine = React.useMemo(() => {
        if (allDay) return "하루 종일";
        const parts = [
            formatKoreanTime(timeStart),
            formatKoreanTime(timeEnd),
        ].filter(Boolean);
        return parts.length > 0 ? parts.join(" ~ ") : "미정";
    }, [allDay, timeStart, timeEnd]);

    return (
        <View style={{ flexDirection: "column", gap: theme.spacing(2) }}>
            <Text style={theme.font.body} accessibilityLabel="meta-date">
                📅 {date} ({weekday})
            </Text>
            <Text style={theme.font.body} accessibilityLabel="meta-time">
                ⏰ {timeLine}
            </Text>
        </View>
    );
}
