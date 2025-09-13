import { atom } from "jotai";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
    year: number;
    month0: number; // 0=Jan
    onPrev: () => void;
    onNext: () => void;
};
export const CalendarHeader = ({ year, month0, onPrev, onNext }: Props) => {
    return (
        <SafeAreaView
            edges={["top"]}
            style={{
                paddingBottom: 20,
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Text style={{ fontSize: 20, fontWeight: 800 }}>
                외근일정 캘린더
            </Text>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                }}
            >
                <Pressable
                    onPress={onPrev}
                    android_ripple={{ color: "#1455b8", borderless: true }}
                    style={{
                        padding: 8,
                        borderRadius: 999,
                    }}
                >
                    <Text style={{ fontSize: 20 }}>‹</Text>
                </Pressable>
                <Text style={{ fontSize: 18, fontWeight: "700" }}>
                    {year}년 {month0 + 1}월
                </Text>
                <Pressable
                    onPress={onNext}
                    android_ripple={{ color: "#1455b8", borderless: true }}
                    style={{
                        padding: 8,
                        borderRadius: 999,
                    }}
                >
                    <Text style={{ fontSize: 20 }}>›</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};
