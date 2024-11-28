import {  StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Subjects from './Subjects'
export type FieldsProps =  "Primary"| "Secondary"| "High School"| "University"| "College"| "Tertiary"| "Post-Graduate"

export default function Fields() {
  const [selected, setSelected] = useState<FieldsProps>("Primary")
  const subjects: FieldsProps[] = [
    "Primary",
    "Secondary",
    "High School",
    "University",
    "College",
    "Tertiary",
    "Post-Graduate",
  ]
  const handlePress = (selectedVal: FieldsProps) => {
    console.log("pressed", selectedVal)
    setSelected(selectedVal)
  }
    const image = {uri: '@/assets/images/app/SubjectBg.png'}
  return (
    <View style={styles.container}>
      <Subjects pressed={handlePress} selected={selected} subjects={subjects} />
      <Text style={styles.text}>Fields</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
    },
    text: {
        color: 'white',
        fontSize: 42,
        fontWeight: 'bold'
    }
})