import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  Text,
  useAnimatedValue,
  View,
} from "react-native";
import Colors from "@/constants/Colors";
import SearchBar from "@/components/index/SearchBar";
import { useEffect } from "react";
import Fields from "@/components/index/Fields";
import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

export default function TabOneScreen() {
  const { user } = useUser();

  if (!user) {
    return <Redirect href={"./(auth)"} />;
  }

  const fadeAnim = useAnimatedValue(0);
  const fromTop = useAnimatedValue(-100);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const Top = () => {
    Animated.timing(fromTop, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
    Top();
  }, []);

  const renderHeader = () => (
    <Animated.View
      style={[
        styles.headCard,
        { opacity: fadeAnim, transform: [{ translateY: fromTop }] },
      ]}
    >
      <View style={styles.greetView}>
        <Image style={styles.cardimg} source={{ uri: user.imageUrl }} />
        <View>
          <Text style={styles.greetTxt}>Hello {user.firstName},</Text>
          <Text style={styles.greetTxt2}>Nice to See You</Text>
        </View>
      </View>
      <SearchBar />
    </Animated.View>
  );
  return (
    <FlatList
      data={[{}]}
      renderItem={() => <Fields />}
      keyExtractor={(_, index) => index.toString()}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  headCard: {
    backgroundColor: Colors.yellow,
    borderRadius: 20,
    padding: 20,
    height: 200,
    justifyContent: "center",
  },
  cardimg: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  greetView: {
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
