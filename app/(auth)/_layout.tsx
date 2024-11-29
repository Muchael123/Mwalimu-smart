import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useAuth } from '@clerk/clerk-expo'
import Login from './login'

export default function _layout() {
    const { isSignedIn } = useAuth()
    if (isSignedIn) {
        return <Redirect href={'/(tabs)'} />
      }
  return (
    <SafeAreaView style={styles.container}>
         <Stack screenOptions={{presentation: 'formSheet', headerShown: false}}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="forgot-password" />
    </Stack>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1
  }
})