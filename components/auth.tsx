import { View } from "react-native";
import { Text } from "./ui/text";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { router } from "expo-router";

export default function Auth() {
    return (
        <View className='flex-1 justify-center items-center gap-2 p-2 bg-secondary/30'>
            <Text className="font-bold text-6xl text-center">Convierte tus chats en ventas</Text>
            <Card className='w-full max-w-md p-2 rounded-2xl'>
                <CardHeader className='items-center'>
                    <CardTitle className=' text-center'>Iniciar Sesión</CardTitle>
                </CardHeader>
                <CardContent>

                </CardContent>
                <CardFooter className='flex-col gap-3 pb-0'>
                    <View className='flex-col items-center overflow-hidden w-full text-left'>
                        <View className="w-full">

                            <Label>Email</Label>
                        </View>
                        <Input className='w-full' placeholder='ejemplo@mail.com' />

                        <View className="w-full">
                            <Label>Contraseña</Label>
                        </View>
                        <Input className='w-full' secureTextEntry placeholder='*****' />
                    </View>
                    <View />

                    <Button
                        variant='default'
                        className='w-full shadow shadow-foreground/5'
                        onPress={() => router.navigate("/(drawer)")}
                    >
                        <Text>Iniciar sesión</Text>
                    </Button>
                    <Text>Ya tienes una cuenta? Inicia Sesión</Text>
                    <Text className="text-xs">Al crear una cuenta, aceptas nuestros Terminos y Condiciones</Text>
                </CardFooter>
            </Card>
        </View>
    )
}