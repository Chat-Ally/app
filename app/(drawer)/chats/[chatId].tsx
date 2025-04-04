import { Text } from "~/components/ui/text";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import { View } from "react-native";

export default function Chat() {
    const { chatId, phone } = useLocalSearchParams();
    const apiKey = "app-LDTX7iTuedti8ssDbycaq9Ec"
    const url = "http://optimusprimal.duckdns.org:8128/v1"
    const [loading, setLoading] = useState(true)
    const [chat, setChat] = useState([])

    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
    };

    useEffect(() => {
        async function getConversationHistoryMessages(): Promise<any> {
            if (chatId.length > 0) {
                const conversation = await fetch(`${url}/messages?user=${phone}&conversation_id=${chatId}`, {
                    headers: headers
                });
                console.log(conversation)
                let conversationJSON = await conversation.json()
                if (conversationJSON) {
                    setChat(conversationJSON.data)
                    console.log(chat)
                    setLoading(false)
                }
            }
        }
        getConversationHistoryMessages()
    }, [chatId, phone])

    if (loading) return (
        <SafeAreaProvider>
            <ActivityIndicator />
        </SafeAreaProvider>
    )

    if (!loading && chat.length > 0) return (
        <SafeAreaProvider>
            <FlatList
                data={chat}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View>
                        <View className="bg-slate-100 max-w-xs p-2 rounded-lg m-2">
                            <Text>{item.query}</Text>
                        </View>
                        <View className=" flex flex-row-reverse rounded-lg">
                            <View className="bg-black text-white max-w-xs rounded-lg p-2 m-2">
                                <Text className="text-white">
                                    {item.answer}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
            />
        </SafeAreaProvider>
    );
}