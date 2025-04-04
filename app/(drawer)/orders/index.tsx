import React, { useEffect, useState } from 'react';
import { View, FlatList } from "react-native";
import { Text } from "~/components/ui/text";
import { supabase } from "~/lib/supabase";

export default function OrdersScreen() {
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data: ordersData, error: fetchError } = await supabase.from("orders").select("*");
            if (fetchError) {
                console.error(fetchError);
            }
            if (ordersData) {
                console.log(ordersData);
                setData(ordersData);
            }
        };

        fetchData();
    }, []);

    return (
        <View className="flex-1 p-4 ">
            <Text className="text-xl font-bold mb-4">Órdenes</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View className="py-3 border-b border-gray-200 flex-row justify-between items-center">
                        <Text className="text-lg">{item.created_at}</Text>
                        <Text className="font-bold">{item.amount}</Text>
                        <View className="bg-green-300 px-3 py-1 rounded-full">
                            <Text className="font-semibold">{item.status}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}
