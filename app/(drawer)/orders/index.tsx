import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, FlatList } from "react-native";
import { Card } from '~/components/ui/card';
import { Text } from "~/components/ui/text";
import { supabase } from "~/lib/supabase";

export default function OrdersScreen() {
    const [data, setData] = useState<any>([]);
    const options = { style: 'currency', currency: 'USD' };
    const formatter = new Intl.NumberFormat('en-US', options);

    useEffect(() => {
        const fetchData = async () => {
            const { data: ordersData, error: ordersError } = await supabase
                .from("orders")
                .select(`
                        id,
                        created_at,
                        total,
                        subtotal,
                        chats(
                            id,
                            customer_name,
                            phones(
                                number
                            )
                        ),
                        business_id,
                        status
                    `);
            if (ordersError) {
                console.error(ordersError);
            }
            if (ordersData) {
                console.log(JSON.stringify(ordersData));
                setData(ordersData);
            }
        };

        fetchData();
    }, []);

    return (
        <View className="flex-1 mx-2 mt-2">
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Link
                        href={{
                            pathname: '/(drawer)/orders/[id]',
                            params: {
                                id: item.id,
                                chat_id: item.chat_id,
                                customer: item.chats?.customer_name || item.chats?.phones?.number || 'unkown',
                                date: item.created_at,
                                total: item.total,
                                subtotal: item.subtotal,
                            }
                        }}
                        className="flex-row justify-between items-center mt-2"
                    >
                        <Card className='p-2'>
                            <View className='flex flex-row w-full justify-between'>
                                <View>
                                    <Text className="text-3xl font-bold">#{item.id}</Text>
                                    <Text className="font-bold">{item.chats?.customer_name || item.chats?.phones?.number || 'unkown'}</Text>
                                </View>
                                <View className="">
                                    <Text className="font-semibold text-xs  bg-green-100 px-3 py-1 rounded-full  ">{item.status}</Text>
                                    <Text className="font-bold">{formatter.format(item.total)}</Text>
                                </View>
                            </View>
                            <Text className="text-lg">{new Date(item.created_at).toLocaleDateString()}</Text>
                            <Text className="font-bold">{item.amount}</Text>
                        </Card>
                    </Link>
                )}
            />
        </View>
    );
}
