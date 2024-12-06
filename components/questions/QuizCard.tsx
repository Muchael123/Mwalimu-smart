import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { correctAnswerResponses, detailedAnswerIntroPhrases, wrongAnswerResponses } from '@/constants/Responses'
import Colors from '@/constants/Colors'
import { MaterialIcons } from '@expo/vector-icons'
import { Question } from '@/constants/LearningTypes'
import Dimensions from '@/constants/Dimensions'

interface QuizCardProps {
    Quiz: Question,
    enabled: boolean,
    setEnabled: (enabled: boolean) => void
    index: number,
    goToNext: (index: number) => void
}

export default function QuizCard({Quiz,enabled,setEnabled, index, goToNext}: QuizCardProps) {
    const [selectedOption, setSelectedOption] = useState<number | null>(null)
    const [error, setError] = useState<boolean | null>(null)
  

    const CheckError = (choice: string, i: number) => {
        setSelectedOption(i)
        if(choice === Quiz.correctAnswer.basicAnswer) {
            setError(false)
            setEnabled(false)
            return;
        }
        setError(true)
    }

  return (
    <View style={styles.container}>
      
     <View style={styles.quizcont}>
     {error === true ? (
        error &&  <View style={styles.errorView}>
        <MaterialIcons name="error-outline" size={24} color="white" />
        <Text style={styles.errorText}>{wrongAnswerResponses[Math.floor(Math.random() * wrongAnswerResponses.length)]}</Text>
      </View>
      )  : error === false ? (
        <View style={[styles.errorView, {backgroundColor: Colors.green}]} >
        <MaterialIcons name="done" size={24} color="white" />
        <Text style={styles.errorText}>{correctAnswerResponses[Math.floor(Math.random() * correctAnswerResponses.length)]}</Text>
        </View>
        ) : null  
    }
        <Text style={styles.question}>{Quiz.question}</Text>
        <View style={styles.choices} >
            {Quiz.options.map((choice, index) => (
                <Pressable 
                key={index} 
                disabled={!enabled}
                style={selectedOption === index ? [styles.choice, {backgroundColor: '#f5f5f5'}] : styles.choice}
                 onPress={()=>CheckError(choice, index)}>
                    <Text style={selectedOption === index ? [styles.text, {color: Colors.black}] : styles.text}>{choice}</Text>
                 </Pressable>
            ))}
        </View>
     </View>
     {
        error !== null && 
        <View>
            <Text 
            style={[styles.explanation, {fontWeight: 'semibold', fontSize: 20,color: Colors.yellow}]} >
                {detailedAnswerIntroPhrases[Math.floor(Math.random()* detailedAnswerIntroPhrases.length)]}
                </Text>
            <Text style={styles.explanation}>{Quiz.correctAnswer.detailedAnswer}</Text>

            {!enabled && (
        <View style={styles.nextButtonContainer}>
          <Pressable onPress={()=>goToNext(index+1)} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next Question</Text>
          </Pressable>
        </View>
      )}
            </View>
     }
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    },
    quizcont: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    question: {
      fontSize: Dimensions.screenWidth > 360 ? 20 : 18,  
      color: 'white',
      textAlign: 'center',
      marginVertical: 10,
      paddingHorizontal: 10, 
    },
    choices: {
      width: '100%',
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
      textAlign: 'center',
    },
    errorView: {
      backgroundColor: 'red',
      borderRadius: 10,
      padding: 8,
      marginTop: 12,
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      marginBottom: 20,
    },
    errorText: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'semibold',
      maxWidth: '80%',
    },
    explanation: {
      color: 'white',
      fontSize: 18,
      textAlign: 'center',
      marginTop: 20,
    },
    nextButtonContainer: {
      position: 'absolute',
      bottom: 20,
      width: '100%',
      alignItems: 'center',
    },
    nextButton: {
      backgroundColor: '#4CAF50',
      paddingVertical: 12,
      paddingHorizontal: 25,
      borderRadius: 10,
    },
    nextButtonText: {
      color: 'white',
      fontSize: 18,
    },
  });
