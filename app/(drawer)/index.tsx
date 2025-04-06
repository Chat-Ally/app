import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { Card, CardTitle } from "~/components/ui/card";
import { Text } from "~/components/ui/text";

interface HomeCardProps {
    title: string,
    amount: number,
    percent: number
}

function HomeCard({ title, amount, percent }: HomeCardProps) {
    return (
        <Card className="p-4 gap-4">
            <CardTitle>{title}</CardTitle>
            <Text className="font-bold text-5xl">${amount}</Text>
            <Text className="text-xl">+{percent}% en los ultimos 3 meses</Text>
        </Card>
    )
}

export default function HomeScreen() {


    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({
            title: "Bienvenido",
            headerStyle: {
                elevation: 0
            }
        })
    }, [])


    return (
        <View className="mx-2 gap-2">
            <HomeCard title="Ganancias" amount={4822.50} percent={18} />
            <HomeCard title="Conversaciones" amount={1229.90} percent={31} />
            <HomeCard title="Ventas" amount={492.30} percent={22} />
        </View>
    )
}