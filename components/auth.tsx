import { View, Alert } from "react-native";
import { Text } from "./ui/text";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Auth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function signInWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error) Alert.alert(error.message)
        setLoading(false)
    }
    async function signUpWithEmail() {
        setLoading(true)
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        })
        if (error) Alert.alert(error.message)
        if (!session) Alert.alert('Please check your inbox for email verification!')
        setLoading(false)
    }

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
                        <Input
                            className='w-full'
                            placeholder='ejemplo@mail.com'
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                        />

                        <View className="w-full">
                            <Label>Contraseña</Label>
                        </View>
                        <Input
                            className='w-full'
                            secureTextEntry
                            placeholder='*****'
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            autoCapitalize={'none'}
                        />
                    </View>
                    <View />

                    <Button
                        variant='default'
                        className='w-full shadow shadow-foreground/5'
                        onPress={() => signInWithEmail()}
                    >
                        <Text>Iniciar sesión</Text>
                    </Button>
                    <Text>No tienes una cuenta? Crea una ahora</Text>
                    <Text className="text-xs">Al crear una cuenta, aceptas nuestros Terminos y Condiciones</Text>
                </CardFooter>
            </Card>
        </View>
    )
}