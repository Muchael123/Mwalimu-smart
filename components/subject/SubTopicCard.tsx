import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import { SubTopic } from '@/constants/LessonTypes';
import { useRouter } from 'expo-router';

interface SubTopicCardProps {
  item: SubTopic;
}

const SubTopicCard = ({ item }: SubTopicCardProps) => {
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

  return (
    <TouchableOpacity onPress={handlePress} style={styles.topic}>
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
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
