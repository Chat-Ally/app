import React from 'react';
import { View, TextInput, Pressable, Image, ScrollView } from 'react-native';
import { Text } from '~/components/ui/text';
import { Card } from '~/components/ui/card';
import { LucidePhone, LucideMessageSquare, LucideMessageCircle } from 'lucide-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Asegúrate de importar GestureHandlerRootView

export default function Ajustes() {
  // Asumo que tienes un objeto de usuario con displayname, pero puede que sea undefined.
  const user = { displayname: "Sebastián Perez" }; // Simulando un objeto con displayname

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16 }} style={{ flex: 1 }}>
        <Text className="text-xl font-bold mb-4 text-black dark:text-white">📱 Ajustes</Text>

        {/* Mi Cuenta */}
        <Text className="text-lg font-semibold mb-2 text-black dark:text-white">Mi cuenta</Text>
        <View className="flex-row items-center mb-4">
          <Image className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700" />
          <View className="ml-4">
            <Text className="text-sm text-blue-500">Cambiar foto</Text>
          </View>
        </View>
        
        {/* Usar Optional Chaining para evitar el error */}
        <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">Nombre</Text>
        <TextInput
          className="border p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
          defaultValue={user?.displayname} // Aquí usamos optional chaining para evitar el error si 'user' es undefined
        />

        <Text className="text-sm text-gray-600 dark:text-gray-400 mt-4 mb-1">Email</Text>
        <TextInput className="border p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white" placeholder="Email" />

        <Text className="text-sm text-gray-600 dark:text-gray-400 mt-4 mb-1">Contraseña</Text>
        <TextInput className="border p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white" secureTextEntry defaultValue="****" />

        {/* Mi Negocio */}
        <Text className="text-lg font-semibold mt-6 mb-2 text-black dark:text-white">Mi negocio</Text>
        <View className="flex-row items-center mb-4">
          <Image className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700" />
          <View className="ml-4">
            <Text className="text-sm text-blue-500">Cambiar foto</Text>
          </View>
        </View>
        <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">Nombre</Text>
        <TextInput className="border p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white" defaultValue='Taquería "El Padrino"' />

        {/* Suscripción */}
        <Text className="text-lg font-semibold mt-6 mb-2 text-black dark:text-white">Suscripción</Text>
        <Card className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <Text className="text-md font-bold text-black dark:text-white">Gratuito</Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400">$0.00 mxn</Text>
          <View className="flex-row mt-3">
            <Pressable className="bg-gray-800 dark:bg-gray-600 p-2 rounded-lg flex-1 mr-2">
              <Text className="text-white text-center">Cambiar plan</Text>
            </Pressable>
            <Pressable className="border p-2 rounded-lg flex-1">
              <Text className="text-black dark:text-white text-center">Editar método de pago</Text>
            </Pressable>
          </View>
        </Card>

        {/* Canales */}
        <Text className="text-lg font-semibold mt-6 mb-2 text-black dark:text-white">Canales</Text>
        <Pressable className="flex-row items-center justify-between p-3 border-b border-gray-300 dark:border-gray-700">
          <View className="flex-row items-center">
            <LucidePhone size={20} color="gray" />
            <Text className="ml-2 text-black dark:text-white">Teléfono</Text>
          </View>
        </Pressable>
        <Pressable className="flex-row items-center justify-between p-3 border-b border-gray-300 dark:border-gray-700">
          <View className="flex-row items-center">
            <LucideMessageSquare size={20} color="gray" />
            <Text className="ml-2 text-black dark:text-white">SMS</Text>
          </View>
        </Pressable>
        <Pressable className="flex-row items-center justify-between p-3 border-b border-gray-300 dark:border-gray-700">
          <View className="flex-row items-center">
            <LucideMessageCircle size={20} color="gray" />
            <Text className="ml-2 text-black dark:text-white">Whatsapp</Text>
          </View>
        </Pressable>

        {/* Botón Guardar */}
        <Pressable className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg mt-6">
          <Text className="text-center text-black dark:text-white">Guardar</Text>
        </Pressable>
      </ScrollView>
    </GestureHandlerRootView>
  );
}
