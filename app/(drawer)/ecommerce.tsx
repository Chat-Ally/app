import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useState, useCallback } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle, Rect } from "react-native-svg";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle } from "react-native-reanimated";
import tinycolor from 'tinycolor2';

export default function Ecommerce() {
  const [primaryColor, setPrimaryColor] = useState('#F0F0F0');
  const [titleFont, setTitleFont] = useState('Inter');
  const [paragraphFont, setParagraphFont] = useState('Inter');
  const [borderCurvature, setBorderCurvature] = useState(0);
  const [borderSize, setBorderSize] = useState(0);

  // Hue slider for color picker
  const hueY = useSharedValue(100); // Track vertical position

  const onGestureEvent = useCallback((event: any) => {
    let y = Math.max(0, Math.min(event.nativeEvent.y, 180)); // Keep within bounds
    hueY.value = y; // Update vertical position
    const hue = (y / 480) * 360; // Calculate hue based on vertical position

    // Convert HSL to HEX using tinycolor2
    const hexColor = tinycolor({ h: hue, s: 100, l: 50 }).toHexString();
    setPrimaryColor(hexColor);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: hueY.value }] 
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={[styles.title, { fontFamily: titleFont }]}>Color primario</Text>
        
        {/* Container with flexDirection: 'row' to align components horizontally */}
        <View style={styles.rowContainer}>
          
          {/* Color Gradient Picker */}
          <View style={styles.gradientBox}>
            <LinearGradient
              colors={[primaryColor, "black"]} // Change the second color dynamically to fit the picked color
              style={StyleSheet.absoluteFill}
            />
          </View>

          {/* Hue Slider */}
          <View style={styles.hueSlider}>
            <LinearGradient
              colors={["red", "yellow", "lime", "cyan", "blue", "magenta", "red"]}
              style={styles.hueGradient}
            />
            
            {/* Drag Handle */}
            <PanGestureHandler onGestureEvent={onGestureEvent}>
              <Animated.View style={[styles.sliderThumb, animatedStyle]}>
                <Svg height="40" width="40">
                  <Rect x="1" y="1" width="38" height="20" rx="10" ry="25" fill={primaryColor} stroke="white" strokeWidth="2" />
                </Svg>
              </Animated.View>
            </PanGestureHandler>
          </View>
          <Text style={[styles.colorCode, { fontFamily: paragraphFont }]}>{primaryColor}</Text>

        </View>

        {/* Hex Code */}
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  scrollView: { alignItems: "center", paddingVertical: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 2, marginRight: 180 },
  
  // This is the container that wraps all components horizontally
  rowContainer: {
    flexDirection: 'row',  // Aligns children horizontally in a row
    alignItems: 'center',  // Ensures the components are vertically aligned
    width: '100%',  // Optional: Takes up the full width of the parent
  },

  gradientBox: { width: 200, height: 200, borderTopLeftRadius: 12, borderBottomLeftRadius: 12, overflow: "hidden", marginLeft:15 },
  
  // Styles for the Hue Slider
  hueSlider: { width: 40, height: 200,  borderTopRightRadius: 12, borderBottomRightRadius: 12, overflow: "hidden", justifyContent: "center" },
  
  hueGradient: { height: "100%", width: "100%" },
  
  sliderThumb: { position: "absolute", left: 0, top: 0 }, 

  // Color code display
  colorCode: { fontSize: 24, fontWeight: "bold", marginTop: 10, marginLeft: 10 }
});
