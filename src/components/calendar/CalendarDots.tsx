import { View } from "react-native";

type Props = {
    dots: string[];
};
export default function CalendarDots({ dots }: Props) {
    return (
        <View
            style={{
                marginTop: 4,
                // 최대 2줄(점 8개)까지 래핑 표시
                width: 36, // 셀 폭(42)보다 살짝 작게 잡아 중앙정렬 느낌
                minHeight: 12, // 1줄 높이
                maxHeight: 18, // 2줄 높이(줄바꿈 대비)
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignContent: "center",
            }}
        >
            {dots.map((c, i) => (
                <View
                    key={i}
                    style={{
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: c,
                        margin: 1, // 점 간격
                    }}
                />
            ))}
        </View>
    );
}
