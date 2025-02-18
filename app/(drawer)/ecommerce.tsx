import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function Ecommerce() {
  const { style } = useTailwind();

  const [primaryColor, setPrimaryColor] = useState('#F0F0F0');
  const [titleFont, setTitleFont] = useState('Inter');
  const [paragraphFont, setParagraphFont] = useState('Inter');
  const [borderCurvature, setBorderCurvature] = useState(0);
  const [borderSize, setBorderSize] = useState(0);

  const availableFonts = ['Inter', 'Alberto Sans', 'ANTON', 'BANGERS', 'Caprasimo', 'CASTORO TITLING'];

  return (
    <ScrollView style={style('flex-1 bg-white p-4')}>
      <Text style={style('text-2xl font-bold mb-4')}>Ecommerce</Text>

      {/* Color primario */}
      <View style={style('mb-4')}>
        <Text style={style('text-lg font-semibold')}>Color primario</Text>
        <View style={style('bg-white border border-gray-300 rounded p-2 mt-1')}>
          {/* Aquí puedes añadir un selector de color */}
          <View style={style('bg-red-500 w-6 h-6 rounded-full')}></View>
          <Text style={style('ml-2')}>{primaryColor}</Text>
        </View>
      </View>

      {/* Fuente */}
      <View style={style('mb-4')}>
        <Text style={style('text-lg font-semibold')}>Fuente</Text>

        {/* Títulos */}
        <View style={style('mb-2')}>
          <Text style={style('text-base')}>Títulos</Text>
          <View style={style('border border-gray-300 rounded p-2 mt-1')}>
            {availableFonts.map((font) => (
              <Pressable key={font} onPress={() => setTitleFont(font)}>
                <Text style={style(titleFont === font ? 'font-bold' : '')}>{font}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Párrafos */}
        <View>
          <Text style={style('text-base')}>Párrafos</Text>
          <View style={style('border border-gray-300 rounded p-2 mt-1')}>
            {availableFonts.map((font) => (
              <Pressable key={font} onPress={() => setParagraphFont(font)}>
                <Text style={style(paragraphFont === font ? 'font-bold' : '')}>{font}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      {/* Bordes */}
      <View style={style('mb-4')}>
        <Text style={style('text-lg font-semibold')}>Bordes</Text>

        {/* Curvatura */}
        <View style={style('mb-2')}>
          <Text style={style('text-base')}>Curvatura</Text>
          {/* Aquí puedes añadir un slider para controlar la curvatura */}
          <Text>{borderCurvature}%</Text>
        </View>

        {/* Tamaño */}
        <View>
          <Text style={style('text-base')}>Tamaño</Text>
          {/* Aquí puedes añadir un slider para controlar el tamaño */}
          <Text>{borderSize}%</Text>
        </View>
      </View>

      {/* Botón Guardar */}
      <Pressable style={style('bg-blue-500 p-3 rounded')}>
        <Text style={style('text-white text-center')}>Guardar</Text>
      </Pressable>
    </ScrollView>
  );
}