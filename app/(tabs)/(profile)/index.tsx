import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

export default function profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>profile</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: Colors.SubjectSelected,
  }
})