import { 
  Animated,
  Dimensions, 
  DrawerLayoutAndroid, 
  Image, 
  Platform, 
  ScrollView, 
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
import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";


export default function TabOneScreen() {
  const {user} = useUser();
  if (!user) {
    return <Redirect href={'/(auth)'} />;
  }
 
  // console.log('user', user.firstName, user.imageUrl,"email \n", user.id);


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
      <ScrollView style={styles.container}>
        <Animated.View style={[styles.headCard, 
          { opacity: fadeAnim, transform: [{translateY: fromTop}]
          }
        ]}>
          <View style={styles.greetView}>
            <Image
              style={styles.cardimg}
              source={{ uri: user.imageUrl }}
            />
            <View>
              <Text style={styles.greetTxt}>Hello {user.firstName},</Text>
              <Text style={styles.greetTxt2}>Nice to See You</Text>
            </View>
          </View>
          <SearchBar />
        </Animated.View>
        <Fields />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
