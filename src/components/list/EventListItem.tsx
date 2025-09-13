// src/components/EventListItem.tsx
import { View, Text, Pressable } from "react-native";
import { theme } from "../../theme";
import { TYPE_COLOR } from "../../constants/calendar";

type Props = {
    title: string;
    time?: string;
    location?: string;
    type?: string;
    onPress: () => void;
};

export function EventListItem({ title, time, location, type, onPress }: Props) {
    const color = type ? TYPE_COLOR[type] : TYPE_COLOR["OTHER"];

    return (
        <Pressable
            onPress={onPress}
            style={{
                backgroundColor: theme.colors.surface,
                borderRadius: theme.radius.md,
                borderWidth: 1,
                borderColor: theme.colors.border,
                padding: theme.spacing(3),
                marginBottom: theme.spacing(2),
                gap: theme.spacing(1),
            }}
        >
            {/* 상단: 색 점 + 제목 */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: theme.spacing(2),
                }}
            >
                <View
                    style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: color,
                    }}
                />
                <Text style={theme.font.body}>{title}</Text>
            </View>

            {/* 하단: 시간 + 장소 */}
            <Text style={theme.font.caption}>
                {time || "시간 미정"}
                {location ? ` • ${location}` : ""}
            </Text>
        </Pressable>
    );
}
