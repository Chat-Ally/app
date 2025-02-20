import { View, Text, FlatList, Pressable } from "react-native";

const conversations = [
    { id: "1", name: "Andrea", time: "Hace 1 min" },
    { id: "2", name: "Pepe", time: "Hace 2 min" },
    { id: "3", name: "Pedro", time: "Hace 10 min" },
];

export default function Chats() {
    const handlePress = (item) => {
        console.log("Pressed", item.name);
    };

    return (
        <View className="flex-1 p-4 bg-white">
            <FlatList
                data={conversations}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => handlePress(item)}
                        android_ripple={{ color: "#ddd" }} 
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed ? "#f0f0f0" : "white", 
                            },
                            { paddingVertical: 8, borderBottomWidth: 1, borderColor: "#e0e0e0" },
                        ]}
                    >
                        <View>
                            <Text className="text-lg font-semibold">{item.name}</Text>
                            <Text className="text-gray-500">{item.time}</Text>
                        </View>
                    </Pressable>
                )}
            />
        </View>
    );
}
