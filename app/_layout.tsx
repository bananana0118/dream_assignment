import { Stack } from "expo-router";
import { Provider } from "jotai";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Boot } from "../src/boot/Boot";

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <Provider>
                <Boot />
                <Stack
                    screenOptions={{
                        headerShown: false,
                        contentStyle: { backgroundColor: "white" },
                    }}
                />
            </Provider>
        </SafeAreaProvider>
    );
}
