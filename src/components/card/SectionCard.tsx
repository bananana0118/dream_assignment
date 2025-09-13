import { Text, View } from "react-native";
import { theme } from "../../theme";

export default function SectionCard({
    label,
    content,
}: {
    label: string;
    content: string;
}) {
    return (
        <View
            style={{
                borderWidth: 1,
                borderColor: theme.colors.border,
                borderRadius: theme.radius.lg,
                padding: theme.spacing(3),
                gap: theme.spacing(1.5),
                backgroundColor: theme.colors.surface,
            }}
        >
            <Text style={{ ...theme.font.caption }}>{label}</Text>
            <Text style={{ ...theme.font.body, lineHeight: 22 }}>
                {content || "—"}
            </Text>
        </View>
    );
}
