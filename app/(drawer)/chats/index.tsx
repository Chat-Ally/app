import { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { getConversations } from "~/lib/enwhats";

interface ChatNameProps {
    text: string
}

function ChatName({ text }: ChatNameProps) {
    return <Text className="text-black dark:text-white">{text}</Text>
}

export default async function Chats() {
    const handlePress = (item: any) => {
        console.log("Pressed", item.name);
    };

    const [chats, setChats] = useState<any>()

    useEffect(() => {
        getConversations().then((conversations: any) => {
            setChats(conversations)
        }).catch(error => {
            console.error(error)
        })
    }, [])

    return (
        <View className="flex-1 p-4 bg-white dark:bg-black">
            {
                chats ?
                    <FlatList
                        data={chats}
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
                                        paddingVertical: 16,
                                        paddingHorizontal: 12,
                                        borderBottomWidth: 1,
                                        borderColor: "#e0e0e0",
                                        marginBottom: 8,
                                    },
                                ]}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {
                                        item.customer_name ?
                                            <ChatName text={item.customer_name} /> :
                                            <ChatName text="Sin nombre" />
                                    }
                                    <Text className="text-lg font-semibold dark:text-white">{item.customer_phone}</Text>
                                </View>
                            </Pressable>
                        )}
                    />
                    :
                    (<Text> Loading</Text>)
            }

        </View >
    );
}