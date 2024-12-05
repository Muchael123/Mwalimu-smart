import {  ActivityIndicator, ScrollView, StyleSheet, Text,  TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import Colors from '@/constants/Colors'
import { FlashList, MasonryFlashList } from "@shopify/flash-list";
import { Topic, TopicResponse } from '@/constants/LessonTypes';
import TopicCard from '@/components/subject/TopicCard';
import Dimensions from '@/constants/Dimensions';
import SubTopicCard from '@/components/subject/SubTopicCard';
import SubTopics from '@/components/subject/SubTopics';

export default function Topics() {
  const {id, name} = useLocalSearchParams();
  const [data, setData] = useState<Topic[]>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);
  const ScrollRef = useRef<ScrollView>(null);
  const [title, setTitle] = useState<string>(`Topics in ${name}`)
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  useEffect(() => {
    fetchTopics();
  }, [id])
  const scrollTo = (index: number, id: string, t:string) => {
    ScrollRef.current?.scrollTo({x: index * Dimensions.screenWidth, y: 0, animated: true});
  setSelectedTopicId(id)
    setTitle(`SubTopics in ${t} (${name})`)
  }
  const fetchTopics = async () => {

    if (!id) return;
    try {
      const url = `https://mwalimu-smart.vercel.app/api/topics/${id}`;
      const response = await fetch(url);
      if (!response.ok) {
        setError("Failed to fetch topics");
      }
      const data: TopicResponse = await response.json();
      setData(data.topics);
    } catch (err) {
      console.log(err);
    }finally{
      setLoading(false);
    }
  }
  return (
    <View style={styles.container}>
        <Stack.Screen
        options={{ title: title, headerTitleAlign: "center" }}
      />
     {loading ? (
      <View style={styles.load}>
        <ActivityIndicator size="large" color={Colors.yellow} />
        <Text style={styles.text}>Loading...</Text>
      </View>
     ): (
      <ScrollView
      scrollEnabled={false}
      ref={ScrollRef}
      showsHorizontalScrollIndicator={false}
       horizontal>
       <View style={styles.View}>
       <FlashList
      data={data}
      estimatedItemSize={12}
       keyExtractor={(item) => item._id}
       renderItem={({ item }) => (
         <TopicCard selected={selectedTopicId} item={item} onPress={scrollTo} />
       )}
       ListEmptyComponent={()=> (
         <View>
           <Text style={styles.text}>No topics found</Text>
           <TouchableOpacity style={styles.retry} onPress={fetchTopics}>
             <Text style={styles.text}>Try again</Text>
           </TouchableOpacity>
         </View>
                )}
                />
       </View>
        <View style={styles.View}>
          { selectedTopicId && <SubTopics  goback={()=> {
            ScrollRef.current?.scrollTo({x:0,y:0})
            setTitle(`Topics in ${name}`)
          }} topicId={selectedTopicId} />}
        </View>
      </ScrollView>

     )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: Colors.white,
    textAlign: "center",
  },
  topic: {
    backgroundColor: Colors.inputField,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  retry: {
    backgroundColor: Colors.btnText,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  load: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  View: {
    width: Dimensions.screenWidth*.9,
    padding: 40,
    
  }
})