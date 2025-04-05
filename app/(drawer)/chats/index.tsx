import { Link, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Text } from '~/components/ui/text';
import { supabase } from "../../../lib/supabase";
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import { H3 } from '~/components/ui/typography';

interface Chat {
    id: string;
    created_at: string;
    customer_name: any;
    phones: {
        number: string
    }
}

export default function Chats() {
    const [chats, setChats] = useState<Chat[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchChats = async () => {
            const { data, error } = await supabase.auth.getUser()
            if (error) console.error(error)

            const { data: businessData, error: businessError } = await supabase
                .from("business")
                .select("id")
                .eq("owner_id", data.user?.id)
                .single();
            if (businessError) console.error(businessError);

            let { data: chatsData, error: chatsError } = await supabase
                .from("chats")
                .select(`
                    id,
                    customer_name,
                    created_at,
                    phones(number)
                `)
                .eq('business_id', businessData?.id)
            if (chatsError) console.error(chatsError);
            if (chatsData) setChats(chatsData)
        };
        fetchChats();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={chats}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Link
                        href={{
                            pathname: '/(drawer)/chats/[chatId]',
                            params: {
                                chatId: item.id,
                                phone: item.phones.number,
                                name: item.customer_name
                            }
                        }}
                    >
                        <Avatar alt="Zach Nugent's Avatar" className='mr-2'>
                            {/* <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} /> */}
                            <AvatarFallback>
                                <Text>{(item.customer_name?.slice(0, 2) || item.phones?.number?.slice(3, 5)) || 'desconocido'}</Text>
                            </AvatarFallback>
                        </Avatar>
                        <View className='ml-2'>
                            <H3 role='heading' >{item.customer_name || item.phones.number || 'desconocido'}</H3>
                            <Text>{new Date(item.created_at).toLocaleString()}</Text>
                        </View>
                    </Link>
                )}
            />
        </View>
    );
}