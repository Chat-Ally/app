import { View, Text, Pressable} from "react-native";
import {useState} from "react"

export default function Suscripción() {
    const [selectedOption, setSelectedOption] = useState(null);

    const handlePress = (option) => {
        setSelectedOption(option);
    };

    const renderOption = (option, title, description, price, features) => {
        const isSelected = selectedOption === option;
        const borderColor = isSelected ? "border-blue-500" : "border-gray-300";
        const fontWeight = isSelected ? "font-bold" : "font-semibold";

        return (
            <Pressable
                key={option}
                className={`p-4 mb-4 border ${borderColor} rounded-lg`}
                onPress={() => handlePress(option)}
            >
                <View className="flex-row items-center justify-between">
                    <View>
                        <Text className={`text-lg ${fontWeight}`}>{title}</Text>
                        <Text className="text-gray-500">{description}</Text>
                    </View>
                    <Text className="font-bold">{price}</Text>
                </View>
                <View className="mt-2">
                    {features.map((feature, index) => (
                        <Text key={index} className="text-gray-500">• {feature}</Text>
                    ))}
                </View>
            </Pressable>
        );
    };

    return (
        <View className="flex-1 p-4 bg-white">
            <Text className="text-xl font-bold mb-4">Suscripción</Text>

            {renderOption("free", "Gratuito", "Ideal para empezar a vender.", "Gratis", [])}
            {renderOption("entrepreneur", "Emprendedor", "Agiliza tus ventas y mejora tu producto.", "$299.00 MXN/mes", [
                "Hasta 30 chats al día",
                "Hasta 100 productos",
                "Mensajes ilimitados",
                "Whatsapp y SMS"
            ])}
            {renderOption("premium", "Premium", "Tienda en línea personalizable.", "$999.00 MXN/mes", [
                "Chats, Mensajes y productos ilimitados",
                "Whatsapp, SMS y Teléfono"
            ])}

            <Pressable className="mt-4 bg-blue-500 p-3 rounded-lg">
                <Text className="text-white text-center">Guardar</Text>
            </Pressable>
        </View>
    );
}