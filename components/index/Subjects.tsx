import { Animated, FlatList, StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Colors from '@/constants/Colors'
import { Lesson, LessonResponse } from '@/constants/LessonTypes'

interface SubjectsProps {
  subjects: Lesson[] | null // Corrected the type to match the data structure
  pressed: (val: Lesson) => void
  selected: Lesson | null
}

export default function Subjects({ subjects, pressed, selected }: SubjectsProps) {
  const Appear = useRef(new Animated.Value(0)).current; // Fixed animated value initialization
  const MyscrollViewRef = useRef<FlatList>(null);

  const fadeIn = () => {
    Animated.timing(Appear, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const handleScroll = (index: number) => {
    MyscrollViewRef.current?.scrollToIndex({
      index: index < 1 ? 0 : index - 1,
      animated: true,
    });
  };

  useEffect(() => {
    fadeIn();
  }, []);

  return (
    <View style={styles.units}>
      <FlatList
        data={subjects || []} // Ensure subjects is not null
        horizontal={true}
        ref={MyscrollViewRef}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => {
              pressed(item);
              handleScroll(index);
            }}
          >
            <Animated.View
              style={[
                styles.sub,
                {
                  opacity: Appear,
                  transform: [
                    {
                      translateX: Appear.interpolate({
                        inputRange: [0, 1],
                        outputRange: [index * 100, 0],
                      }),
                    },
                  ],
                },
                { backgroundColor: selected?._id === item._id ? 'white' : Colors.SubjectCard },
              ]}
            >
              <Text
                style={[
                  styles.text,
                  { color: selected?._id === item._id ? Colors.SubjectCard : 'white' },
                ]}
              >
                {item.name}
              </Text>
            </Animated.View>
          </Pressable>
        )}
        keyExtractor={(item) => item._id} // Use a unique identifier for keyExtractor
        contentContainerStyle={{ padding: 4, gap: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: Colors.SubjectCard,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sub: {
    padding: 20,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: Colors.Subjectborder,
  },
  units: {
    marginTop: 20,
  }
});
