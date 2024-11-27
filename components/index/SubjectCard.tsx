import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';

interface SubjectCardProps {
    title: string;
    image?: string;
}

export default function SubjectCard({title, image}: SubjectCardProps) {
    console.log(title, image, "from SubjectCard")
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {image && 
      <Image source={{uri: image}} style={{width: 100, height: 100}}/>
      }
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        flexWrap: 'wrap',
        flexDirection: 'row',
        flex: 1,
        backgroundColor: Colors.SubjectCard
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fefefa'
    }
})