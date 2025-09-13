import { Text, View } from "react-native";
import { theme } from "../../theme";

export default function PillTag({
    text,
    bg,
    color = theme.colors.text.inverse,
}: {
    text: string;
    bg: string;
    color?: string;
}) {
    return (
        <View
            style={{
                paddingHorizontal: theme.spacing(2.5), // 10px
                paddingVertical: theme.spacing(1), // 4px
                borderRadius: theme.radius.full,
                backgroundColor: bg,
            }}
        >
            <Text style={{ color, fontWeight: "700", fontSize: 12 }}>
                {text}
            </Text>
        </View>
    );
}
