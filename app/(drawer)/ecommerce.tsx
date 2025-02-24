import { View, Text, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { useState, useCallback } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Rect } from "react-native-svg";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import tinycolor from 'tinycolor2';
import { Button } from 'react-native-paper'; // Import Button from react-native-paper

export default function Ecommerce() {
  const [primaryColor, setPrimaryColor] = useState('#F0F0F0');
  const [selectedButton, setSelectedButton] = useState<string | null>(null); // Estado para el primer conjunto de botones
  const [selectedButton2, setSelectedButton2] = useState<string | null>(null); // Estado para el segundo conjunto de botones

  // Hue slider for color picker
  const hueY = useSharedValue(0); // Track vertical position
  const colorScheme = useColorScheme(); // Detect current color scheme (light or dark)

  // Gesture event handler
  const onGestureEvent = useCallback((event: any) => {
    let y = Math.max(0, Math.min(event.nativeEvent.translationY, 180)); // Keep within bounds
    hueY.value = y; // Update vertical position
    const hue = (y / 480) * 360; // Calculate hue based on vertical position

    // Convert HSL to HEX using tinycolor2
    const hexColor = tinycolor({ h: hue, s: 100, l: 50 }).toHexString();
    setPrimaryColor(hexColor);
  }, []);
  
  const handlePress = (buttonId: string) => {
    if (selectedButton === buttonId) {
      setSelectedButton(null); // If the button is already selected, deselect it
    } else {
      setSelectedButton(buttonId); // Select the button
    }
  };

  const handlePress2 = (buttonId: string) => {
    if (selectedButton2 === buttonId) {
      setSelectedButton2(null); // If the button is already selected, deselect it
    } else {
      setSelectedButton2(buttonId); // Select the button
    }
  };

  // Animated style to apply the vertical movement of the slider thumb
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(hueY.value, { damping: 190, stiffness: 5690 }) }] // smooth transition
    };
  });

  // Define styles based on the theme
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme === 'dark' ? '#121212' : '#FFF',
      alignItems: 'center',
      paddingTop: 20,
    },
    scrollView: {
      alignItems: "center",
      paddingVertical: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 2,
      marginRight: 180,
      color: colorScheme === 'dark' ? '#FFF' : '#000',
      textAlign: 'right',
    },
    title2: {
      fontSize: 24,
      fontWeight: "bold",
      marginTop: 10,
      marginBottom: 2,
      marginRight: 240,
      color: colorScheme === 'dark' ? '#FFF' : '#000',
      textAlign: 'right',
    },
    subtitle: {
      fontSize: 24,
      fontWeight: "normal",
      marginBottom: 2,
      marginRight: 240,
      color: colorScheme === 'dark' ? '#FFF' : '#000',
      textAlign: 'right',
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    gradientBox: {
      width: 200,
      height: 200,
      borderTopLeftRadius: 12,
      borderBottomLeftRadius: 12,
      overflow: "hidden",
      marginLeft: 15,
    },
    hueSlider: {
      width: 40,
      height: 200,
      borderTopRightRadius: 12,
      borderBottomRightRadius: 12,
      overflow: "hidden",
      justifyContent: "center",
    },
    hueGradient: {
      height: "100%",
      width: "100%",
    },
    sliderThumb: {
      position: "absolute",
      left: 0,
      top: 0,
    },
    colorCode: {
      fontSize: 24,
      fontWeight: "bold",
      marginTop: 10,
      marginLeft: 10,
      color: colorScheme === 'dark' ? '#FFF' : '#000',
    },
    buttonContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start', // Change to 'flex-start' to bring buttons closer
      marginTop: 20,
      width: '100%',
    },
    buttonWrapper: {
      margin: 2, // Reduced margin to bring buttons closer together
    },
    buttonStyle: {
      borderRadius: 0, // Rectangular shape (no rounded corners)
      borderWidth: 1,
      borderColor: 'black', // Border color for the button
    },
    buttonContainedStyle: {
      backgroundColor: 'black', // Change contained button background color to black
    },
    buttonTextStyle: {
      color: colorScheme === 'dark' ? 'white' : 'black', // Text color adjusts based on theme
    },
    buttonTextSelected: {
      color: 'white', // Text color for selected button in any theme
    },
    sliderContainer: {
      width: '80%',
      height: 40,
      marginTop: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    sliderTrack: {
      width: '100%',
      height: 8,
      borderRadius: 4,
      backgroundColor: 'lightgray', // Cambia este color para el track
    },
   

  
    
  });

  // Mapping button IDs to font families
  const buttonFonts = {
    '1': 'Inter',
    '2': 'Alberto Sans',
    '3': 'Anton',
    '4': 'Bangers',
    '5': 'Caprasimo',
    '6': 'Castoro Titling',
  };

  return (
    <GestureHandlerRootView style={dynamicStyles.container}>
      <ScrollView contentContainerStyle={dynamicStyles.scrollView}>
        <Text style={[dynamicStyles.title]}>Color primario</Text>

        <View style={dynamicStyles.rowContainer}>
          <View style={dynamicStyles.gradientBox}>
            <LinearGradient
              colors={[primaryColor, "black"]} // Gradient color based on primary color
              style={StyleSheet.absoluteFill}
            />
          </View>

          <View style={dynamicStyles.hueSlider}>
            <LinearGradient
              colors={["red", "yellow", "lime", "cyan", "blue", "magenta", "red"]}
              style={dynamicStyles.hueGradient}
            />

            {/* PanGestureHandler */}
            <PanGestureHandler onGestureEvent={onGestureEvent}>
              <Animated.View style={[dynamicStyles.sliderThumb, animatedStyle]}>
                <Svg height="40" width="40">
                  <Rect x="1" y="1" width="38" height="20" rx="10" ry="25" fill={primaryColor} stroke="white" strokeWidth="2" />
                </Svg>
              </Animated.View>
            </PanGestureHandler>
          </View>
          <Text style={[dynamicStyles.colorCode]}>{primaryColor}</Text>
        </View>

        <Text style={[dynamicStyles.title2]}>Fuentes</Text>

        <Text style={[dynamicStyles.subtitle]}>Títulos</Text>

        {/* Primer conjunto de botones */}
        <View style={dynamicStyles.buttonContainer}>
          {/* Botones */}
          {['1', '2', '3', '4', '5', '6'].map((buttonId) => (
            <View key={buttonId} style={dynamicStyles.buttonWrapper}>
              <Button
                mode={selectedButton === buttonId ? 'contained' : 'outlined'} // Cambia el estilo dependiendo de si está seleccionado
                onPress={() => handlePress(buttonId)}
                style={[
                  dynamicStyles.buttonStyle,
                  selectedButton === buttonId && dynamicStyles.buttonContainedStyle,
                ]}
                labelStyle={[
                  dynamicStyles.buttonTextStyle,
                  selectedButton === buttonId && dynamicStyles.buttonTextSelected,
                ]}
                uppercase={false} // Evitar que el texto del botón se ponga en mayúsculas
                theme={{
                  colors: {
                    primary: 'black', // Botón contenedor tendrá color negro
                  },
                }}
              >
                <Text style={{ fontFamily: buttonFonts[buttonId] }}>
                  Botón {buttonId}
                </Text>
              </Button>
            </View>
          ))}
        </View>

        {/* Segundo conjunto de botones */}
        <Text style={[dynamicStyles.title2]}>Párrafos</Text>

        <View style={dynamicStyles.buttonContainer}>
          {['1', '2', '3', '4', '5', '6'].map((buttonId) => (
            <View key={buttonId} style={dynamicStyles.buttonWrapper}>
              <Button
                mode={selectedButton2 === buttonId ? 'contained' : 'outlined'} // Cambia el estilo dependiendo de si está seleccionado
                onPress={() => handlePress2(buttonId)}
                style={[
                  dynamicStyles.buttonStyle,
                  selectedButton2 === buttonId && dynamicStyles.buttonContainedStyle,
                ]}
                labelStyle={[
                  dynamicStyles.buttonTextStyle,
                  selectedButton2 === buttonId && dynamicStyles.buttonTextSelected,
                ]}
                uppercase={false} // Evitar que el texto del botón se ponga en mayúsculas
                theme={{
                  colors: {
                    primary: 'black', // Botón contenedor tendrá color negro
                  },
                }}
              >
                <Text style={{ fontFamily: buttonFonts[buttonId] }}>
                  Botón {buttonId}
                </Text>
              </Button>
            </View>
          ))}
        </View>
        

        <Text style={[dynamicStyles.title2]}>Bordes</Text>

        <Text style={[dynamicStyles.subtitle]}>Curvatura</Text>



  
<Text style={[dynamicStyles.subtitle]}>Tamaño</Text>


      </ScrollView>
    </GestureHandlerRootView>
  );
}
