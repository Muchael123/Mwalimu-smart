import Icon from "@/components/Icon";
import Colors from "@/constants/Colors";
import Dimensions from "@/constants/Dimensions";
import { Question } from "@/constants/LearningTypes";
import GenerateQuestions from "@/hooks/GenerateQuestions";
import { useUser } from "@clerk/clerk-expo";
import { Link, Redirect, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import QuizView from "@/components/questions/QuizView";

export default function QuizScreen() {
    const {quiz, quizname} = useLocalSearchParams();
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const {user} = useUser();
    const [questions, setQuestions] = useState<Question[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [quizId, setQuizId] = useState<string | null>(null);
    
    
    if(!quiz) {
      return <Redirect href="/(tabs)/(home)" />
    }


    console.log(user?.id)
    useEffect(() => {
      fetchQuiz();
    }, [])

    const setCurrentpage = (index: number) => {
      setCurrentQuestion(index);
    }
    
    const fetchQuiz = async () => {
      console.log(quiz, user?.id)
      setLoading(true);
      if(!quiz || !user) return;
      try{
        const data = await GenerateQuestions(quiz.toString(), user?.id);
        if(data) {
          setQuestions(data.questions);
          setQuizId(data._id);
          return;
        }
        setError("Failed to fetch questions");
      } catch (err) {
        setError("Failed to fetch questions");
      }finally{
        setLoading(false);
      }
    }

    return (
      <View
        style={styles.container}>
          <Stack.Screen options={{
            
            headerTitleAlign: 'center',
            headerStyle: {backgroundColor: Colors.quizbg},
            headerTintColor: Colors.search,
            headerTransparent: true,
            headerTitle: () => (
              <View style={[styles.quizHeader,{gap:10, padding:6}]}>
                <Text style={[styles.texthead, {color: '#666666', marginBottom: 8}]}>{quizname}</Text>
                <Text style={[styles.texthead,{fontSize: 24}]}>Question {currentQuestion+1}</Text>
              </View>
            ),
            headerRight: () => (
              <Pressable hitSlop={30} onPress={() => {}}>
                <MaterialCommunityIcons name="bookmark-outline" size={24} color={Colors.white} />
              </Pressable>
            ),
            headerLeft: () => (
              <Link href="/(tabs)/(home)" style={{padding: 10}}>
              <Icon name='chevron-back' color={Colors.white}   />
            </Link>
            )
          }} 
          />
         
       <View style={styles.quizView}>
        {loading ? (
          <View style={styles.quizView}>
            <ActivityIndicator size="large" color={Colors.yellow} />
            <Text style={styles.text}>Loading...</Text>
            </View>
        ): 
        questions ? (
          <QuizView QuizId={quizId} Quizes={questions} setcurr={setCurrentpage} />
        ): (
          <View style={styles.quizView}>
            <Text style={styles.text}>{error}</Text>
          </View>
        )}
       </View>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.inputField,
    },
    text: {
      fontSize: Dimensions.screenWidth > 360 ? 20 : 18, 
      color: Colors.white,
    },
    quizView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    quizHeader: {
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
    texthead: {
      fontSize: Dimensions.screenWidth > 360 ? 18 : 16,  // Adjust header text size based on screen size
      color: Colors.search,
      fontWeight: 'semibold',
      letterSpacing: 1.2,
    },
    action: {
      width: '100%',
      padding: 20,
      backgroundColor: Colors.yellow,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    pressed: {
      width: '100%',
      padding: 20,
      backgroundColor: Colors.yellow,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      opacity: 0.5,
    },
    texthead1: {
      fontSize: 20,
      color: Colors.inputField,
      fontWeight: 'semibold',
      letterSpacing: 1.2,
    },
  });
  