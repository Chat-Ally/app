import { View, Text, FlatList, Pressable } from "react-native";
import {Button} from "../../../components/ui/button";

const orders = Array(10).fill({
    id: Math.random().toString(),
    date: "1/12/2025",
    amount: "$199.00",
    status: "Exitoso",
});

export default function OrdersScreen() {
    return (
        <Pressable className="flex-1 p-4 bg-white">
            <Text className="text-xl font-bold mb-4">Órdenes</Text>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View className="py-3 border-b border-gray-200 flex-row justify-between items-center">
                        <Text className="text-lg">{item.date}</Text>
                        <Text className="font-bold">{item.amount}</Text>
                        <View className="bg-green-300 px-3 py-1 rounded-full">
                            <Text className="font-semibold">{item.status}</Text>
                        </View>
                        <Button> width={24} height={24} color="gray" </Button>
                    </View>
                )}
            />
        </Pressable>
    );
}
