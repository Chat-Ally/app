import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Text } from "~/components/ui/text";
import { supabase } from "~/lib/supabase";

export default function Products() {
    const { id, image_url, name, price } = useLocalSearchParams();
    const [product, setProduct] = useState<any>()
    const [productName, setProductName] = useState<any>(name || '')
    const [imageURL, setImageURL] = useState<any>(image_url || '')
    const [productPrice, setProductPrice] = useState<any>(price || '')
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            title: "Productos",
            headerStyle: {
                elevation: 0
            }
        })
    }, [id])
    /* useEffect(() => {
        const fetchProduct = async () => {
            let { error, data } = await supabase
                .from('products')
                .select('*')
                .eq("id", id)
            if (error) console.error("Error fetching products:", error);
            if (data) {
                console.log(data)
                setProduct(data || []);
            }
        };
        fetchProduct();
    }, []); */

    async function updateProduct() {
        const { data, error } = await supabase
            .from('products')
            .update([{
                name: productName,
                image_url: imageURL,
                price: productPrice,
                business_id: businessId
            }])
            .eq("id", id)
            .select()
        if (data) console.log(data)
        if (error) console.error(error)
    }



    return (
        <View
            style={{ flex: 1 }}
            className="flex flex-col py-2 mx-2"
        >
            <Image
                className='w-full bg-gray-300 aspect-square rounded-lg mr-2'
                source={{ uri: String(image_url) }}
            />
            <View style={{ flex: 1 }} className="py-4 ">
                <View style={{ flex: 1 }} className="flex flex-row items-center ">
                    <View style={{ flex: 3 }} >
                        <Label
                            htmlFor="username" className="text-center mr-2 ">
                            <Text className="text-xl">
                                Nombre
                            </Text>
                        </Label>
                    </View>
                    <View style={{ flex: 9 }} >
                        <Input
                            id="name"
                            value={productName}
                            onChange={(text: string) => setProductName(text)}
                            placeholder="Nombra tu producto"
                        />
                    </View>
                </View>
                <View style={{ flex: 1 }} className="flex flex-row items-center ">
                    <View style={{ flex: 3 }} >
                        <Label
                            htmlFor="username" className="text-center mr-2 ">
                            <Text className="text-xl">
                                URL de la imagen
                            </Text>
                        </Label>
                    </View>

                    <View style={{ flex: 9 }} >
                        <Input
                            id="image-url"
                            value={imageURL}
                            onChange={(e: string) => setImageURL(e)}
                            placeholder="Imagen de tu producto"
                        />
                    </View>
                </View>
                <View style={{ flex: 1 }} className="flex-row items-center ">
                    <View style={{ flex: 3 }} >
                        <Label
                            htmlFor="username" className="text-center mr-2">
                            <Text className="text-xl">
                                Precio
                            </Text>
                        </Label>
                    </View>
                    <View style={{ flex: 9 }} >
                        <Input
                            id="price"
                            value={productPrice}
                            onChange={(e: string) => setProductPrice(e)}
                            keyboardType="numeric"
                            placeholder=""
                        />
                    </View>
                </View>
            </View>
            <Button
                onPress={() => updateProduct()}
            >
                <Text>
                    Guardar Producto
                </Text>
            </Button>

            <Button
                variant={"destructive"}
                onPress={() => updateProduct()}
                className="mt-2"
            >
                <Text>
                    Borrar Producto
                </Text>
            </Button>

        </View>
    )
}