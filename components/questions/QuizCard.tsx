import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  correctAnswerResponses,
  detailedAnswerIntroPhrases,
  wrongAnswerResponses,
} from "@/constants/Responses";
import Colors from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Question, QuizArray } from "@/constants/LearningTypes";
import Dimensions from "@/constants/Dimensions";
import { useUser } from "@clerk/clerk-expo";
import UpdateMyLearning, { State } from "@/hooks/UpdateMyLearning";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

interface QuizCardProps {
  Quiz: Question;
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  index: number;
  goToNext: (index: number) => void;
  setScore: (score: number) => void;
  score?: number;
  QuizId: string | null;
}

export default function QuizCard({
  Quiz,
  enabled,
  setEnabled,
  index,
  goToNext,
  setScore,
  score,
  QuizId,
}: QuizCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [error, setError] = useState<boolean | null>(null);
  const [attempted, setAttempted] = useState<boolean>(false);
  const [quizArray, setQuizArray] = useState<QuizArray | null>(null);
  const { user } = useUser();

  const setAttemptedTrue = () => {
    setAttempted(true);
  };

  const CheckError = (choice: string, i: number) => {
    setSelectedOption(i);
    setAttemptedTrue();
    if (attempted === false) {
      if (choice === Quiz.correctAnswer.basicAnswer) {
        UpdateData("correct");
        setScore(score! + 1);
        setError(false);
        setEnabled(false);
        return;
      }
      UpdateData("failed");
      setError(true);
    } else {
      if (choice === Quiz.correctAnswer.basicAnswer) {
        setError(false);
        setEnabled(false);
        return;
      }
      setError(true);
      setEnabled(true);
    }
  };

  const UpdateData = async (state: State) => {
    if (!user || !QuizId) return;
    const data = await UpdateMyLearning(user.id, QuizId, state);
    console.log(
      "Updated data...",
      "correct answers",
      data?.passedQuestions,
      "\nWrong Answers",
      data?.failedQuestions
    );
    setQuizArray({ failedQuestions: data?.failedQuestions, passedQuestions: data?.passedQuestions });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.quizcont}>
       {quizArray && (
         <View style={styles.checked}>
         {quizArray?.failedQuestions?.includes(index) && (
           <FontAwesome name="times" size={24} color="red" />
         )}
         {quizArray?.passedQuestions?.includes(index) && (
           <AntDesign name="check" size={24} color="green" />
         )}
       </View>
       )}
        <View style={styles.scoreCon}>
          <Text style={styles.scoretxt}>Your Score</Text>
          <Text style={[styles.scoretxt, { fontWeight: "bold" }]}>
            {score} / 10
          </Text>
        </View>
        {error === true ? (
          error && (
            <View style={styles.errorView}>
              <MaterialIcons name="error-outline" size={24} color="white" />
              <Text style={styles.errorText}>
                {
                  wrongAnswerResponses[
                    Math.floor(Math.random() * wrongAnswerResponses.length)
                  ]
                }
              </Text>
            </View>
          )
        ) : error === false ? (
          <View style={[styles.errorView, { backgroundColor: Colors.green }]}>
            <MaterialIcons name="done" size={24} color="white" />
            <Text style={styles.errorText}>
              {
                correctAnswerResponses[
                  Math.floor(Math.random() * correctAnswerResponses.length)
                ]
              }
            </Text>
          </View>
        ) : null}
        <Text style={styles.question}>{Quiz.question}</Text>
        <View style={styles.choices}>
          {Quiz.options.map((choice, index) => (
            <Pressable
              key={index}
              disabled={!enabled}
              style={
                selectedOption === index
                  ? [styles.choice, { backgroundColor: "#f5f5f5" }]
                  : styles.choice
              }
              onPress={() => CheckError(choice, index)}
            >
              <Text
                style={
                  selectedOption === index
                    ? [styles.text, { color: Colors.black }]
                    : styles.text
                }
              >
                {choice}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      {error !== null && (
        <View>
          <View style={styles.explancon}>
            <Text
              style={[
                styles.explanation,
                { fontWeight: "semibold", fontSize: 24, color: Colors.yellow },
              ]}
            >
              {
                detailedAnswerIntroPhrases[
                  Math.floor(Math.random() * detailedAnswerIntroPhrases.length)
                ]
              }
            </Text>
            <Text style={styles.explanation}>
              {Quiz.correctAnswer.detailedAnswer}
            </Text>
          </View>

          {!enabled && (
            <View style={styles.nextButtonContainer}>
              {index > 0 && (
                <Pressable
                  onPress={() => goToNext(index - 1)}
                  style={[
                    styles.nextButton,
                    { backgroundColor: "#303030", flex: 1 },
                  ]}
                >
                  <Text style={[styles.nextButtonText, { fontSize: 16 }]}>
                    Previous Question
                  </Text>
                </Pressable>
              )}
              <Pressable
                onPress={() => goToNext(index + 1)}
                style={styles.nextButton}
              >
                <Text style={styles.nextButtonText}>{index === 9 ? "Finish Quizes" : 'Next Question'}</Text>
              </Pressable>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: Dimensions.screenWidth,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  explancon: {
    backgroundColor: "#303030",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
    borderRadius: 20,
    borderBottomRightRadius: 0,
  },
  quizcont: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#303030",
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.Subjectborder,
    position: "relative",
    paddingTop: 30,
  },
  question: {
    fontSize: Dimensions.screenWidth > 360 ? 20 : 18,
    color: "white",
    textAlign: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  choices: {
    width: "100%",
    gap: 10,
    marginTop: 20,
  },
  choice: {
    padding: 13,
    backgroundColor: Colors.SubjectTextSelected,
    borderRadius: 10,
  },
  text: {
    color: Colors.white,
    fontSize: 18,
    textAlign: "center",
  },
  errorView: {
    backgroundColor: "red",
    borderRadius: 10,
    padding: 8,
    marginTop: 4,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  errorText: {
    color: "white",
    fontSize: 14,
    fontWeight: "semibold",
    maxWidth: "80%",
  },
  explanation: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    letterSpacing: 1.2,
    fontWeight: 200,
  },
  nextButtonContainer: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  nextButton: {
    backgroundColor: Colors.yellow,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    flex: 2,
    justifyContent: "center",
  },
  nextButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  scoreCon: {
    position: "absolute",
    top: 0,
    right: 0,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 50,
    backgroundColor: Colors.yellow,
    gap: 5,
  },
  scoretxt: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: "semibold",
    textAlign: "center",
  },
  checked: {
    position: "absolute",
    top: 0,
    left: 0,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 50,
    borderColor: Colors.yellow,
    borderWidth: 1,
    gap: 5,
  },
});
