import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import Colors from '@/constants/Colors'
import Dimensions from '@/constants/Dimensions'
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Learn() {
  const {subtopicid, learn, description} = useLocalSearchParams()
  const router = useRouter()
  
  return (
    <View style={styles.container}>
       <Stack.Screen
        options={{ title: ` ${learn}`, headerTitleAlign: "center" }}
      />
      <Text style={styles.titletxt}>Let's learn {learn}</Text>
      <View style={styles.choices}>
      <Pressable
      onPress={() => {
        router.push({
          pathname: `/(modals)/quiz/[quiz]`,
          params: {
            quiz: subtopicid.toString(),
             quizname: learn.toString()
          }
        })
      }}
       style={({pressed})=> {
        if(pressed){
          return styles.pressed
        }
        return styles.action
      }}>
      <Entypo name="open-book" size={28} color={Colors.black} />
        <Text style={styles.text}>Learn</Text>
       </Pressable>
       <Pressable style={({pressed})=> {
        if(pressed){
          return styles.pressed
        }
        return styles.action
      }}>
     <FontAwesome name="question-circle-o" size={28} color={Colors.black} />
     <Text style={styles.text}>Ask question</Text>
     </Pressable>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'semibold',
    letterSpacing: 1.3,
    
  },
  action: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.yellow,
    borderRadius: 20
  },
  choices: {
    width: '100%',
    height: Dimensions.screenHeight*.2,
    padding: 20,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20
  },
  titletxt: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 1.1,
    marginVertical: 20,
    color: Colors.SubjectSelected
  },
  pressed: {
    backgroundColor: Colors['dark-gray'],
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  }
})