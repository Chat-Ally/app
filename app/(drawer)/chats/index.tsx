import { Link, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Text } from '~/components/ui/text';
import { supabase } from "../../../lib/supabase";
import { Avatar, AvatarFallback } from '~/components/ui/avatar';

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
        navigation.setOptions({
            title: "Chats",
            headerStyle: {
                elevation: 0
            }
        })
    }, [])


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
        <View style={{ flex: 1 }} className=''>
            <FlatList
                style={{ flex: 1 }}
                className='px-2'
                data={chats}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Link
                        style={{ flex: 1 }}
                        className='border-b border-gray-200 dark:border-gray-800  mt-2 pb-2'
                        href={{
                            pathname: '/(drawer)/chats/[chatId]',
                            params: {
                                chatId: item.id,
                                phone: item.phones.number,
                                name: item.customer_name
                            }
                        }}
                    >
                        <View style={{ flex: 1 }} className='w-full flex-row items-center '>
                            <Avatar alt="Zach Nugent's Avatar" className='mr-2 w-16 aspect-square '>
                                {/* <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} /> */}
                                <AvatarFallback>
                                    <Text>{(item.customer_name?.slice(0, 2) || item.phones?.number?.slice(3, 5)) || 'desconocido'}</Text>
                                </AvatarFallback>
                            </Avatar>
                            <View >
                                <Text role='heading' className=' text-2xl' >{item.customer_name || item.phones.number || 'desconocido'}</Text>
                                <Text className=' text-gray-500'>{new Date(item.created_at).toLocaleString()}</Text>
                            </View>
                        </View>
                    </Link>
                )}
            />
        </View>
    );
}