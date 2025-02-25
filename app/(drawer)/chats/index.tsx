import { View, Text, FlatList, Pressable } from "react-native";

const conversations = [
    { id: "1", name: "Andrea", time: "Hace 1 min", number: 5 },
    { id: "2", name: "Pepe", time: "Hace 2 min", number: 3 },
    { id: "3", name: "Pedro", time: "Hace 10 min", number: 8 },
];

export default function Chats() {
    const handlePress = (item) => {
        console.log("Pressed", item.name);
    };

    return (
        <View className="flex-1 p-4 bg-white dark:bg-black">
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
                            { 
                                paddingVertical: 16,  // Aumentando el tamaño vertical
                                paddingHorizontal: 12, // Añadiendo espacio horizontal
                                borderBottomWidth: 1, 
                                borderColor: "#e0e0e0",
                                marginBottom: 8, // Separar entre elementos
                            },
                        ]}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <Text className="text-lg font-semibold dark:text-white">{item.name}</Text>
                                <Text className="text-gray-500 dark:text-white">{item.number} mensajes</Text> {/* Mostrar el número debajo del nombre */}
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text className="text-gray-500 dark:text-white" style={{ textAlign: 'right' }}>
                                    {item.time}
                                </Text>
                            </View>
                        </View>
                    </Pressable>
                )}
            />
        </View>
    );
}
