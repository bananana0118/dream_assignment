import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { Counter } from "./src/components/Counter";

export default function App() {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Counter />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
function atom(arg0: number) {
    throw new Error("Function not implemented.");
}

function useAtom(countAtom: any): [any, any] {
    throw new Error("Function not implemented.");
}
