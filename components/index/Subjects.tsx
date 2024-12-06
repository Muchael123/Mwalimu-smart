import { Animated, FlatList, StyleSheet, Text, View, Pressable, RefreshControl } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Colors from '@/constants/Colors'
import { Lesson, LessonResponse } from '@/constants/LessonTypes'

interface SubjectsProps {
  subjects: Lesson[] | null 
  pressed: (val: Lesson) => void
  selected: Lesson | null
  getlevels: () => void
}

export default function Subjects({ subjects, pressed, selected, getlevels }: SubjectsProps) {
  const Appear = useRef(new Animated.Value(0)).current; 
  const MyscrollViewRef = useRef<FlatList>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
  const getmylevels = () => {
    setLoading(true)
    try{
      getlevels()

    }catch (error){
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  return (
    <View style={styles.units}>
      <FlatList
        data={subjects} 
        horizontal={true}
        ref={MyscrollViewRef}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={getmylevels}
            tintColor={Colors.light.tabIconSelected}
          />
        }
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
        keyExtractor={(item) => item._id} 
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
