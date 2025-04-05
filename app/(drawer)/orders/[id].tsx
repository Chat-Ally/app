import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import { FlatList, View } from "react-native";
import { Text } from "~/components/ui/text";
import { H2, H3, H4, P } from "~/components/ui/typography";
import formatter from "~/lib/money-formater";
import { supabase } from "~/lib/supabase";

export default function Orders() {
    const { id, customer, date, total, subtotal, chat_id } = useLocalSearchParams();
    const [products, setProducts] = useState<any>([])
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            title: "Orden #" + id,
            headerStyle: {
                elevation: 0
            }
        })
    }, [id])

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from("product_order")
                .select(`
                    id, 
                    created_at, 
                    products(
                        name,
                        price,
                        image_url
                    ), 
                    quantity
                `)
                .eq("order_id", id)
            if (error) {
                console.error(error);
            }
            if (data) {
                console.log(JSON.stringify(data));
                setProducts(data);
            }
        };
        fetchData();

        return () => setProducts([])
    }, [id])
    return (
        <View className="p-2">
            <H2>Detalles de la orden</H2>
            <View className="flex flex-row justify-between w-full">
                <View>
                    <H3 className="h-10 ">Cliente</H3>
                    <H3 className="h-10 ">Fecha</H3>
                    <H3 className="h-10 ">Total</H3>
                </View>
                <View>
                    <P className="h-10 text-xl ">{customer}</P>
                    <P className="h-10 text-xl ">{new Date(date).toLocaleDateString()}</P>
                    <P className="h-10 text-xl ">{formatter.format(total)}</P>
                </View>
            </View>
            <View className="mt-4">
                <H2>Productos</H2>
                <FlatList
                    keyExtractor={(item) => item.id.toString()}
                    data={products}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1 }} className="flex-row pt-2 ">
                            <Image
                                source={{
                                    uri: item.products.image_url
                                }}
                                className="aspect-square rounded-xl bg-slate-100 w-32"
                                style={{ flex: 1 }}
                            />
                            <View style={{ flex: 2 }} className="ml-2  ">
                                <H4>{item.products.name}</H4>
                                <View className="flex flex-row justify-between mt-2" >
                                    <Text>Cantidad: {item.quantity}</Text>
                                    <Text>{formatter.format(item.products.price)}</Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}