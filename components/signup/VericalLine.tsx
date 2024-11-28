import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

export default function VericalLine() {
  return (
    <View style={styles.container}>
      <View style={styles.separator}  />
      <Text style={styles.or}>OR</Text>
      <View style={styles.separator}  />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10
    },
  separator: {
    marginVertical: 30,
    height: StyleSheet.hairlineWidth,
    flex: 1,
    backgroundColor: Colors['dark-gray']
  },
    or: {
        color: Colors.Subjectborder,
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10
    }
})