import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import Colors from '@/constants/Colors'
import { FlashList } from "@shopify/flash-list";

export default function Topics() {
  const {id, name} = useLocalSearchParams();
  useEffect(() => {
  }, [])
  return (
    <View style={styles.container}>
        <Stack.Screen
        options={{ title: `Topics in ${name}`, headerTitleAlign: "center" }}
      />
      <Text style={styles.text}>Topics for {name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: Colors.white
  }
})