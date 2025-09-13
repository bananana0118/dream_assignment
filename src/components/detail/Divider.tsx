import { View } from "react-native";
import { theme } from "../../theme";

export default function Divider() {
    return (
        <View
            style={{
                height: 1,
                backgroundColor: theme.colors.border,
                marginVertical: theme.spacing(1),
            }}
        />
    );
}
