import React from 'react'
import { Stack } from 'expo-router'


type Props = {}

export default function _layout(props: Props) {
 
    return (
       <Stack>
        <Stack.Screen options={{headerShown: false}} name="index" />
        <Stack.Screen name='[id]' options={{
         headerTitleAlign: 'center',
         presentation: 'modal',
         animation: 'slide_from_right',
         
      }} />
       <Stack.Screen name='[units]' options={{
         headerTitleAlign: 'center',
         presentation: 'modal',
         animation: 'slide_from_right',
         
      }} />
       </Stack>
    )
    }