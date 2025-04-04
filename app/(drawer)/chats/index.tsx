import { Link, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Text } from '~/components/ui/text';

interface Chat {
    id: string;
    created_at: string;
    business_id: number;
    customer_phone_id: number;
    customer_name?: string | null;
}

export default function Chats() {
    const [chats, setChats] = useState<Chat[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        fetchChats();
    }, []);

    const fetchChats = async () => {
        try {
            const response = await fetch(process.env.EXPO_PUBLIC_API_URL + '/chats');
            const data = await response.json();
            console.log(data)
            if (data && data.chats) {
                setChats(data.chats);
            }
        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Text>Conversaciones</Text>
            <FlatList
                data={chats}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Link
                        href={{
                            pathname: '/(drawer)/chats/[id]',
                            params: { id: item.id }
                        }}
                    >
                        <View>
                            <Text>{item.customer_name || 'Unknown'}</Text>
                            <Text>{new Date(item.created_at).toLocaleString()}</Text>
                        </View>
                    </Link>
                )}
            />
        </View>
    );
}