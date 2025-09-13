import { Text, View } from "react-native";
import { WEEKDAYS } from "../../constants/calendar";

export default function CalendarWeekdaysHeader() {
    return WEEKDAYS.map((d) => (
        <View key={d} style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontWeight: "600" }}>{d}</Text>
        </View>
    ));
}
