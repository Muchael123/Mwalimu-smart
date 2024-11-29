import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function QuizScreen() {
    const {id} = useLocalSearchParams();
    return (
      <View>
        <Text>Quiz ID: {id}</Text>
      </View>
    );
  }
  
 
  