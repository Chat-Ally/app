import { Text } from "~/components/ui/text";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import { View } from "react-native";
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

export default function Chat() {
    const { chatId, phone, name } = useLocalSearchParams();
    const [loading, setLoading] = useState(true)
    const [chat, setChat] = useState([])
    const navigation = useNavigation()
    const apiKey = process.env.EXPO_PUBLIC_DIFY_API_KEY
    const url = process.env.EXPO_PUBLIC_DIFY_URL

    dayjs.extend(timezone)
    dayjs.extend(utc);

    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
    };

    useEffect(() => {
        navigation.setOptions({
            title: name || phone
        })
    }, [phone, name])

    useEffect(() => {
        async function getConversationHistoryMessages(): Promise<any> {
            if (chatId.length > 0) {
                const conversation = await fetch(`${url}/messages?user=${phone}&conversation_id=${chatId}`, {
                    headers: headers
                });
                console.log(conversation)
                let conversationJSON = await conversation.json()
                if (conversationJSON) {
                    conversationJSON.data.sort((a: any, b: any) => parseInt(b.created_at) - parseInt(a.created_at))
                    setChat(conversationJSON.data)
                    console.log(chat)
                    setLoading(false)
                }
            }
        }
        getConversationHistoryMessages()

        return () => {
            setLoading(true)
        }
    }, [chatId, phone])

    if (loading) return (
        <SafeAreaProvider>
            <ActivityIndicator />
        </SafeAreaProvider>
    )

    if (!loading && chat.length > 0) return (
        <SafeAreaProvider>
            <FlatList
                inverted={true}
                data={chat}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View>
                        <View className="bg-slate-100 dark:bg-slate-400 w-fit max-w-sm p-2 rounded-lg m-2">
                            <Text className="dark:text-black">{item.query}</Text>
                        </View>
                        <View className="flex flex-row-reverse rounded-lg">
                            <View className="bg-black text-white w-min max-w-sm rounded-lg p-2 m-2">
                                <Text className="text-white">
                                    {item.answer}
                                </Text>
                                <Text className="text-neutral-100 text-xs">{dayjs.unix(item.created_at).tz("America/Mexico_City").format("D MMM YYYY h:mm a")}</Text>
                            </View>
                        </View>
                    </View>
                )}
            />
        </SafeAreaProvider>
    );
}