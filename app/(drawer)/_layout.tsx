import { ParamListBase } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import Drawer from "expo-router/drawer";
import { useEffect } from "react";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import CustomDrawerContent from "~/components/custom-drawer";
import { useUserSession } from "~/lib/user-context";

export default function DrawerLayout() {
    const { session } = useUserSession()
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

    // Listen to changes in state, redirect if session is null
    useEffect(() => {
        if (!session) {
            navigation.navigate('index')
        }
    }, [session])

    return (
        <Drawer
            drawerContent={CustomDrawerContent}
        >
            <Drawer.Screen
                name="index"
                options={{
                    drawerLabel: "Inicio",
                    headerShown: true,
                }} />
            <Drawer.Screen
                name="chats/index"
                options={{
                    drawerLabel: "Chats",
                    headerShown: true,
                }} />
            <Drawer.Screen
                name="orders/index"
                options={{
                    drawerLabel: "Ordenes",
                    headerShown: true,
                }} />
            <Drawer.Screen
                name="orders/[id]"
                options={{
                    drawerLabel: "Ordenes",
                    headerShown: true,
                    drawerItemStyle: { display: "none" }
                }} />
            <Drawer.Screen
                name="chats/[id]"
                options={{
                    drawerLabel: "Chats",
                    headerShown: true,
                    drawerItemStyle: { display: "none" }
                }} />

            <Drawer.Screen
                name="products/[id]"
                options={{
                    drawerLabel: "Chats",
                    headerShown: true,
                    drawerItemStyle: { display: "none" }
                }} />

            <Drawer.Screen
                name="products/index"
                options={{
                    drawerLabel: "Productos",
                    headerShown: true,
                }} />
            <Drawer.Screen
                name="ecommerce"
                options={{
                    drawerLabel: "Ecommerce",
                    headerShown: true,
                }} />
            <Drawer.Screen
                name="settings/index"
                options={{
                    drawerLabel: "Ajustes",
                    headerShown: true,
                }} />
            <Drawer.Screen
                name="suscripcion/index"
                options={{
                    drawerLabel: "Subscripción",
                    headerShown: true,
                }} />
        </Drawer>
    )
}