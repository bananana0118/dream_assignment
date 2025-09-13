import { Text, View } from "react-native";
import { theme } from "../../theme";

/** NotFound 뷰(재사용 가능) */
export default function NotFoundView() {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                padding: theme.spacing(6),
            }}
            accessibilityLabel="not-found"
        >
            <Text style={theme.font.body}>일정을 찾을 수 없습니다.</Text>
        </View>
    );
}
