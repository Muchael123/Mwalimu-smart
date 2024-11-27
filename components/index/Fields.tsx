import {  StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Fields() {
    const image = {uri: '@/assets/images/app/SubjectBg.png'}
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Fields</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        height: 200,
        width: '100%',
    },
    text: {
        color: 'white',
        fontSize: 42,
        fontWeight: 'bold'
    }
})