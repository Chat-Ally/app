import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { supabase } from "~/lib/supabase";
import { Text } from '~/components/ui/text';

interface Product {
    id: number;
    name: string;
    description?: string;
}

export default function Product() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            let { error, data } = await supabase
                .from('products')
                .select('*');

            if (error) console.error("Error fetching products:", error);
            else setProducts(data || []);
        };
        fetchProducts();
    }, []);

    return (
        <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View>
                    <Text>{item.name}</Text>
                    {item.description && (
                        <Text>{item.description}</Text>
                    )}
                </View>
            )}
        />
    );
}