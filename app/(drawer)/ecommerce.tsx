import { View, Text, Pressable, ScrollView } from 'react-native';
import { useState } from 'react';

export default function Ecommerce() {
  const [primaryColor, setPrimaryColor] = useState('#F0F0F0');
  const [titleFont, setTitleFont] = useState('Inter');
  const [paragraphFont, setParagraphFont] = useState('Inter');
  const [borderCurvature, setBorderCurvature] = useState(0);
  const [borderSize, setBorderSize] = useState(0);

  const availableFonts = ['Inter', 'Alberto Sans', 'ANTON', 'BANGERS', 'Caprasimo', 'CASTORO TITLING'];

  return (
    <ScrollView>
      <Text>Ecommerce</Text>
      <View>
        <Text>Color primario</Text>
        <View>
          <View></View>
          <Text>{primaryColor}</Text>
        </View>
      </View>

      <View>
        <Text>Fuente</Text>
        <View>
          <Text>Títulos</Text>
          <View>
            {availableFonts.map((font) => (
              <Pressable key={font} onPress={() => setTitleFont(font)}>
                <Text>{font}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View>
          <Text>Párrafos</Text>
          <View>
            {availableFonts.map((font) => (
              <Pressable key={font} onPress={() => setParagraphFont(font)}>
                <Text>{font}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
      <View>
        <Text>Bordes</Text>
        <View>
          <Text>Curvatura</Text>
          <Text>{borderCurvature}%</Text>
        </View>
        <View>
          <Text>Tamaño</Text>
          <Text>{borderSize}%</Text>
        </View>
      </View>
      <Pressable>
        <Text>Guardar</Text>
      </Pressable>
    </ScrollView>
  );
}
