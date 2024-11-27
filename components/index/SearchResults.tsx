import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useDrawerControl } from '@/contexts/DrawerContext'

export default function SearchResults() {
    const {searchValue} = useDrawerControl()
    
  return (
    <View style={styles.container}>
        <Text>Search Results: {searchValue}</Text>
        <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
})