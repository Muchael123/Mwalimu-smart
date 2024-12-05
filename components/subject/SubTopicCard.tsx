import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { SubTopic } from '@/constants/LessonTypes'

const SubTopicCard = (item: SubTopic) => {
 
  return (
    <TouchableOpacity
           onPress={() => console.log(`Pressed ${item.name}`)}
          style={styles.topic}>
           <Text style={styles.text}>{item.name}</Text>
         </TouchableOpacity>
  )
}

export default SubTopicCard

const styles = StyleSheet.create({
  
  text: {
    fontSize: 20,
    color: Colors.white,
    textAlign: "center",
  },
  topic: {
    backgroundColor: Colors.inputField,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
})