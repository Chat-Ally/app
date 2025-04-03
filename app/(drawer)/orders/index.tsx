import { View, Text, FlatList } from "react-native";

/* const orders = Array(10).fill({
    id: Math.random().toString(),
    date: "1/12/2025",
    amount: "$199.00",
    status: "Exitoso",
}); */

const orders = [{
    id: 1,
    date: "1/2/2023",
    amount: "$119.00",
    status: "Exitoso"
}]

export default function OrdersScreen() {
    return (
        <View className="flex-1 p-4 bg-white">
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
                    </View>
                )}
            />
        </View>
    );
}
