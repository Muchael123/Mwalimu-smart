import { Animated, FlatList, StyleSheet, Text, useAnimatedValue, View, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import Colors from '@/constants/Colors'
import { FieldsProps } from './Fields'
interface SubjectsProps {
  subjects: FieldsProps[]
  pressed: (val: FieldsProps) => void
  selected: FieldsProps
}
export default function Subjects({ subjects, pressed, selected }: SubjectsProps) {
  const Appear = useAnimatedValue(0);
  const fadeIn = () => {
    Animated.timing(Appear, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    fadeIn();
  }, []);

  return (
    <View>
     <FlatList
      data={subjects}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) =>
      <Pressable onPress={()=> pressed(item)}>
        <Animated.View style={[styles.sub, {
          opacity: Appear,
          transitionDelay: `${index * 1000}ms`,
          transform: [{translateX: Appear.interpolate({
            inputRange: [0, 1],
            outputRange: [index * 100, 0]
          })
        }]
        }, {backgroundColor: selected === item ? 'white': Colors.SubjectCard}]}>
          <Text style={[styles.text, { color: selected===item? Colors.SubjectCard: 'white'}]}>{item}</Text>
        </Animated.View>
      </Pressable>
      }
      keyExtractor={(item) => item}
      contentContainerStyle={{padding: 4, gap: 20}}
    />
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
    text: {
        
        fontSize: 20,
        fontWeight: 'bold'
    },
    sub: {
      padding: 20,
      borderRadius: 28,
      borderWidth: 1,
      borderColor: Colors.Subjectborder,
    }
})