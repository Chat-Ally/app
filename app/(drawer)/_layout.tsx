import Drawer from "expo-router/drawer";

export default function DrawerLayout() {
    return (
        <Drawer>
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