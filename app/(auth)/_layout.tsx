import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useAuth } from '@clerk/clerk-expo'

export default function _layout() {
    const { isSignedIn } = useAuth()
    if (isSignedIn) {
        return <Redirect href={'/'} />
      }
  return (
    <Stack screenOptions={{presentation: 'formSheet', headerShown: false}}>
        <Stack.Screen name="index" />
        <Stack.Screen name="register" />
        <Stack.Screen name="forgot-password" />
    </Stack>
  )
}

const styles = StyleSheet.create({})