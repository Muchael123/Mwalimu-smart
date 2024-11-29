import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useAuth, useUser } from '@clerk/clerk-expo'
import Login from './login'
import { AddUserToDB } from '@/hooks/AddUserToDb'

export default function _layout() {
    const { isSignedIn } = useAuth()
    const [loading , setLoading] = React.useState(true)
    const {user} = useUser()
    var times = 3
    const Adduser = async (email: string, id:string) => {
      for(times =3; times >= 0; times--){
        try{
          const res = await AddUserToDB(email, id)
          console.log('res',res)
          if (res) return
        }catch (error){
          console.log(error)
        }finally{
          setLoading(false)
        }
      }
    }
    if (isSignedIn) {
      if(user){
        Adduser(user.emailAddresses[0].emailAddress, user.id)
        console.log('user', user.id) 
      }
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