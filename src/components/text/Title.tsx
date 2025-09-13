import { Text } from "react-native";

type Props = {
    text: string;
};

export function Title({ text }: Props) {
    return <Text style={{ fontWeight: "700", fontSize: 16 }}>{text}</Text>;
}
