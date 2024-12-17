import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import { SubTopic } from '@/constants/LessonTypes';
import { useRouter } from 'expo-router';
import Animated, { Easing, LightSpeedInLeft, LightSpeedInRight, LightSpeedOutLeft } from 'react-native-reanimated';

interface SubTopicCardProps {
  item: SubTopic;
  index: number;
}

const SubTopicCard = ({ item, index }: SubTopicCardProps) => {
  const router = useRouter();

  const handlePress = () => {
    console.log(`Pressed ${item.name}`);
   if (item){
    router.push({
        pathname: '/(modals)/[learn]',
        params: {
          subtopicid: item._id,
          name: item.name,
          desc: item.description,
          learn: item.name,
        },
      });
   }
  };

  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <AnimatedTouchableOpacity
     entering={index % 2 === 0 ? LightSpeedInRight.duration(1000).easing(Easing.ease).delay(index * 150) : LightSpeedInLeft.duration(1000).easing(Easing.ease).delay(index * 150)} 
        exiting={LightSpeedOutLeft}
    onPress={handlePress} style={styles.topic}>
      <Text style={styles.text}>{item.name}</Text>
    </AnimatedTouchableOpacity>
  );
};

export default SubTopicCard;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: Colors.white,
    textAlign: 'center',
  },
  topic: {
    backgroundColor: Colors.inputField,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
