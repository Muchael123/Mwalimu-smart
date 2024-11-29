import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

export default function Terms() {
  return (
    <View style={styles.terms}>
        <Text style={styles.termstext}>By creating an account you agree to</Text> 
    <Pressable><Text style={styles.termsimportant}>Terms of Service</Text></Pressable>
     <Text style={styles.termstext}> and </Text> 
     <Pressable><Text style={styles.termsimportant}>privacy policy</Text></Pressable>
     </View>
  )
}

const styles = StyleSheet.create({
    terms: {
       flexDirection: 'row',
       flexWrap: 'wrap',
        fontSize: 14,
        marginTop: 20,
        textAlign: 'center',
        padding: 10,
      },
      termsimportant: {
        color: Colors['dark-gray'],
      },
      termstext: {
         color: '#939393',
         maxWidth: 200,
      }
})