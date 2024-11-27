import { 
  Animated,
  Dimensions, 
  DrawerLayoutAndroid, 
  Image, 
  Platform, 
  StyleSheet, 
  Text, 
  useAnimatedValue, 
  View 
} from "react-native";

import { StatusBar } from "expo-status-bar";
import Colors from "@/constants/Colors";
import SearchBar from "@/components/index/SearchBar";
import { useEffect } from "react";
import Fields from "@/components/index/Fields";


export default function TabOneScreen() {
  const fadeAnim = useAnimatedValue(0);
  const fromTop = useAnimatedValue(-100);
  const Top = () => {
    Animated.timing(fromTop, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    fadeIn();
    Top();
  }, []);

  return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Animated.View style={[styles.headCard, 
          { opacity: fadeAnim, transform: [{translateY: fromTop}]
          }
        ]}>
          <View style={styles.greetView}>
            <Image
              style={styles.cardimg}
              source={{ uri: "https://michael-maina.me/maich.jpg" }}
            />
            <View>
              <Text style={styles.greetTxt}>Hello Michael123,</Text>
              <Text style={styles.greetTxt2}>Nice to See You</Text>
            </View>
          </View>
          <SearchBar />
        </Animated.View>
        <Fields />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 30 : 0,
    paddingHorizontal: 20,
    width: Dimensions.get("window").width,
    flexDirection: 'column',
    gap: 20,
  },
  headCard: {
    backgroundColor: Colors.yellow,
    borderRadius: 20,
    padding: 20,
    height: 200,
    flexDirection: "column",
    justifyContent: "center",
  },
  cardimg: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  greetView: {
    fontSize: 20,
    fontWeight: "bold",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  greetTxt: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.black,
  },
  greetTxt2: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors["dark-gray"],
  },
});
