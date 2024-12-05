import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { Topic } from '@/constants/LessonTypes'

interface Props  {
item: Topic
onPress: (index: number, id: string, t:string) => void;
selected: string | null
}

const TopicCard = ({item, onPress, selected}: Props) => {
 
  return (
    <TouchableOpacity
           onPress={() => {
            onPress(1, item._id, item.name)
           }
           }
          style={
            selected === item._id ? styles.topicselect : styles.topic
          }>
           <Text style={ selected === item._id? styles.textselect : styles.text}>{item.name}</Text>
         </TouchableOpacity>
  )
}

export default TopicCard

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
  topicselect: {
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: Colors.SubjectSelected
  },
  textselect: {
    fontSize: 20,
    color: Colors.btnText,
    textAlign: "center"
  }
})