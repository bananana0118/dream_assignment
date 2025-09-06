import { StatusBar } from "expo-status-bar";
import { atom, useAtom } from "jotai";
import { Button, StyleSheet, Text, View } from "react-native";

const countAtom = atom(0);

export const Counter = () => {
    const [count, setCount] = useAtom(countAtom);
    return (
        <View>
            <Text>count: {count}</Text>
            <Button title="+" onPress={() => setCount((c: number) => c + 1)} />
        </View>
    );
};
