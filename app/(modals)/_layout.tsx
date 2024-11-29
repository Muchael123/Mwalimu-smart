import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function ModalLayout() {
  return (
    <Stack screenOptions={{ presentation: 'modal'}}>
      <Stack.Screen name="chat" />
    </Stack>
  )
}

const styles = StyleSheet.create({})