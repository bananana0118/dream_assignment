import { Text, View } from "react-native";
import { EventItem } from "../../atoms/calendar";
import { theme } from "../../theme";
import PillTag from "../text/PillTag";
import { TYPE_COLOR } from "../../constants/calendar";

export default function DetailHeader({
    title,
    type = "OTHER",
    allDay = false,
}: {
    title: string;
    type?: EventItem["type"];
    allDay?: boolean;
}) {
    return (
        <View style={{ gap: theme.spacing(2) }}>
            {/* 제목 + 배지들 */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: theme.spacing(2),
                    flexWrap: "wrap", // 긴 제목 대비: 줄바꿈 허용
                }}
            >
                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: "800",
                        color: theme.colors.text.primary,
                        flexShrink: 1, // 배지와 가로 공간 충돌 시 제목이 먼저 줄바꿈
                    }}
                    numberOfLines={2} // 두 줄까지만 보여주고 말줄임
                    accessibilityRole="header"
                >
                    {title}
                </Text>

                {/* 타입 배지: 색상은 전역 상수(TYPE_COLOR)에서 관리 */}
                <PillTag
                    text={type ?? "OTHER"}
                    bg={TYPE_COLOR[type ?? "OTHER"]}
                />

                {/* 하루 종일 배지: allDay인 경우에만 노출 */}
                {allDay && (
                    <PillTag text="하루 종일" bg="#e2e8f0" color="#334155" />
                )}
            </View>
        </View>
    );
}
