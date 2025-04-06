import React, { useEffect, useState } from 'react';
import { FlatList, Image, View } from 'react-native';
import { supabase } from "~/lib/supabase";
import { Text } from '~/components/ui/text';
import { Link, useLocalSearchParams, useNavigation } from 'expo-router';
import { Card } from '~/components/ui/card';
import { P } from '~/components/ui/typography';
import formatter from '~/lib/money-formater';

interface Product {
    id: number;
    name: string;
    price: number;
    image_url: string;
    description?: string;
}

export default function Product() {
    const [products, setProducts] = useState<Product[]>([]);
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            title: "Productos",
            headerStyle: {
                elevation: 0
            }
        })
    }, [])

    useEffect(() => {
        const fetchProducts = async () => {
            let { error, data } = await supabase
                .from('products')
                .select('*');
            if (error) console.error("Error fetching products:", error);
            if (data) {
                console.log(data)
                setProducts(data || []);
            }
        };
        fetchProducts();
    }, []);

    return (
        <FlatList
            style={{ flex: 1 }}
            className='mx-2 w-full'
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <Link
                    style={{ flex: 1 }}
                    className='w-full mt-2'
                    href={{
                        pathname: "/(drawer)/products/[id]",
                        params: {
                            id: item.id,
                            image_url: item.image_url,
                            name: item.name,
                            price: item.price
                        }
                    }} >
                    <Card style={{ flex: 1 }} className=' flex-row p-2 w-full mt-2'>
                        <Image
                            className='w-32 bg-gray-300 aspect-square rounded-lg mr-2'
                            source={{
                                uri: item.image_url
                            }}
                        />

                        <View>
                            <P className='text-2xl'>{item.name}</P>
                            {item.description && (
                                <Text>{item.description}</Text>
                            )}
                            {item.price && (
                                <Text className='text-gray-500'>{formatter.format(item.price)}</Text>
                            )}
                        </View>
                    </Card>
                </Link>
            )}
        />
    );
}