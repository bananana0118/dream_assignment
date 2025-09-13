import { Text, View } from "react-native";
import { theme } from "../../theme";

export default function EmptySign() {
    return (
        <View
            style={{
                padding: 16,
                borderWidth: 1,
                borderColor: theme.colors.border,
                borderRadius: 8,
            }}
        >
            <Text>등록된 일정이 없습니다.</Text>
        </View>
    );
}
