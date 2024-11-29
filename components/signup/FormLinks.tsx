import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import Colors from '@/constants/Colors'

export default function FormLinks() {
  return (
    <View style={styles.container}>
      <Link href="/(modals)/index" asChild>
        <Text style={styles.link}>Forgot password?</Text>
        </Link>
        <Link href="/(modals)/index" asChild>
        <Text style={styles.link}>Already have an account? Login</Text>
        </Link>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    link: {
        color: Colors.Subjectborder,
        textDecorationColor: Colors.Subjectborder,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        fontSize: 12,
        textShadowOffset: { width: 1, height: 1 },
    }
})