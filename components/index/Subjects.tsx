import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

export default function Subjects() {
  return (
    <View>
      <Text>Subjects</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        flexWrap: 'wrap',
        flexDirection: 'row',
        flex: 1,
        backgroundColor: Colors.SubjectCard
    },
})