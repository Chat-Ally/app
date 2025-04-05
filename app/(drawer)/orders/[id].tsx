import { useLocalSearchParams } from "expo-router";
import { Text } from "~/components/ui/text";

export default function Orders() {
    const { id } = useLocalSearchParams();
    return (
        <Text>{id}</Text>
    )
}