import { View, Text, FlatList } from "react-native";

const conversations = [
    { id: "1", name: "Andrea", time: "Hace 1 min" },
    { id: "2", name: "Pepe", time: "Hace 2 min" },
    { id: "3", name: "Pedro", time: "Hace 10 min" },
];

export default function Chats() {
    return (
        <View className="flex-1 p-4 bg-white">
            <Text className="text-xl font-bold mb-4">Conversaciones</Text>
            <FlatList
                data={conversations}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View className="py-2 border-b border-gray-200">
                        <Text className="text-lg font-semibold">{item.name}</Text>
                        <Text className="text-gray-500">{item.time}</Text>
                    </View>
                )}
            />
        </View>
    );
}
