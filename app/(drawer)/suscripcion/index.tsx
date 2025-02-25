import { View, Pressable } from "react-native";
import { Card } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { LucideMoreVertical } from "lucide-react-native";
import { useColorScheme } from "react-native";

const products = Array(8).fill({
  name: "Producto",
  price: "$199",
  stock: 12,
});

export default function Productos() {
  const systemTheme = useColorScheme();

  const renderProduct = (item, index) => {
    const borderColor = "border-gray-300 dark:border-gray-700";
    const backgroundColor = "bg-white dark:bg-black";
    const textColor = "text-gray-700 dark:text-gray-400";

    return (
      <Pressable
        key={index}
        className={`p-4 mb-2 border ${borderColor} rounded-lg ${backgroundColor}`}
        onPress={() => console.log(`Producto ${index + 1} presionado`)}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className={`text-lg font-medium ${textColor}`}>{item.name}</Text>
            <Text className={`text-sm ${textColor}`}>Precio: {item.price} | Stock: {item.stock}</Text>
          </View>
          <Pressable>
            <LucideMoreVertical color={systemTheme === "dark" ? "white" : "black"} size={20} />
          </Pressable>
        </View>
      </Pressable>
    );
  };

  return (
    <View className="flex-1 p-4 bg-white dark:bg-black">
      <Card>
        <Text className="text-xl font-bold mb-4 text-black dark:text-white">🛍️ Productos</Text>

        {products.map((product, index) => renderProduct(product, index))}

        <Pressable className="mt-4 bg-blue-500 p-3 rounded-lg">
          <Text className="text-white text-center">Añadir Producto</Text>
        </Pressable>
      </Card>
    </View>
  );
}
