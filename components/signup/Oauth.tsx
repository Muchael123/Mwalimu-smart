import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import VericalLine from './VericalLine'
import Colors from '@/constants/Colors'
import Icon from '../Icon'

export default function Oauth() {
  return (
    <View style={styles.container}>
      <VericalLine />
      <TouchableOpacity style={styles.Next} >
        <Icon name="logo-google" color={Colors['dark-gray']} />
        <Text style={styles.btnText}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    Next: {
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        marginTop:10,
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        borderColor: Colors['dark-gray'],
        borderWidth: 2,
      },
      btnText: {
        color: Colors['dark-gray'],
        fontWeight: 'bold',
        fontSize: 16,

      }
  
})