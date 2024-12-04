import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constants/Colors';

export default function ModalLayout() {
  const router = useRouter()
  const goBack = () => {
    console.log('going back')
    router.back()
  }
  return (
    <Stack screenOptions={{
       presentation: 'modal',
       animation: 'flip',
      headerLeft: () => (
        <TouchableOpacity hitSlop={50} onPress={goBack}>
         <Ionicons name="arrow-back-circle-outline" size={28} color={Colors.yellow} />
        </TouchableOpacity>),
    }}>
      <Stack.Screen name="chat/[chat]" />
      <Stack.Screen name='[id]' options={{
         headerTitleAlign: 'center',
        
      }} />
    </Stack>
  )
}

const styles = StyleSheet.create({})