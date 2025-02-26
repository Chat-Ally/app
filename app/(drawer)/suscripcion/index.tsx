import { useState } from "react";
import { View, Pressable, ScrollView } from "react-native";
import { Text } from "~/components/ui/text";
import { Card } from "~/components/ui/card";
import { RadioButton } from "react-native-paper";
import { useColorScheme } from "nativewind";

export default function Subscription() {
  const { colorScheme } = useColorScheme();
  const [selectedPlan, setSelectedPlan] = useState("free");
  
  const plans = [
    {
      id: "free",
      title: "Gratuito",
      description: "Ideal para empezar a vender en línea.",
      price: "Gratis",
      details: ["Tienda en línea hasta 20 productos"],
    },
    {
      id: "entrepreneur",
      title: "Emprendedor",
      description: "Agiliza tus ventas y mejora tu producto.",
      price: "$299.00 MXN/mes",
      details: ["Hasta 30 chats al día", "Mensajes ilimitados", "Hasta 100 productos", "Whatsapp y SMS"],
    },
    {
      id: "premium",
      title: "Premium",
      description: "Vende a gran escala por distintos canales.",
      price: "$999.00 MXN/mes",
      details: ["Tienda en línea personalizable", "Chats, Mensajes y productos ilimitados", "Whatsapp, SMS y Teléfono"],
    },
  ];

  return (
    <ScrollView className="flex-1 p-4 bg-white dark:bg-black">
      <Text className="text-xl font-bold mb-4 text-black dark:text-white">📦 Suscripción</Text>
      {plans.map((plan) => (
        <Card
          key={plan.id}
          className={`p-4 rounded-lg mb-4 border ${
            selectedPlan === plan.id ? "border-blue-500 bg-blue-100 dark:bg-blue-900" : "border-gray-300 dark:border-gray-700"
          }`}
        >
          <Pressable onPress={() => setSelectedPlan(plan.id)} className="flex-row items-center">
          <RadioButton
              value={plan.id}
              status={selectedPlan === plan.id ? "checked" : "unchecked"}
              onPress={() => setSelectedPlan(plan.id)}
              color="blue"
            />
            <View>
              <Text className="justify-left left-5 text-lg font-bold text-black dark:text-white">{plan.title}</Text>
              <Text className="justify-left left-5 text-gray-600 dark:text-gray-400">{plan.description}</Text>
              {plan.details.map((detail, index) => (
                <Text key={index} className="justify-left left-5 text-xs text-left text-gray-500 dark:text-gray-300">• {detail}</Text>
              ))}
            </View>
            
          </Pressable>
          <Text className="text-lg font-bold text-right text-black dark:text-white mt-2">{plan.price}</Text>
        </Card>
      ))}
      <Pressable className="bg-gray-200 p-3 rounded-lg mt-6">
        <Text className="text-center text-black ">Guardar</Text>
      </Pressable>
    </ScrollView>
  );
}
