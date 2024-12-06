import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constants/Colors';

export default function ModalLayout() {
  const router = useRouter()
  const goBack = () => {
    console.log('going back')
    router.navigate('/(tabs)/(home)')
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
      <Stack.Screen name='[learn]' options={{
         headerTitleAlign: 'center',
         presentation: 'modal',
         animation: 'slide_from_right',
         
      }} />
    </Stack>
  )
}

const styles = StyleSheet.create({})