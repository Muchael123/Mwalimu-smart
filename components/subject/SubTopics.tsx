import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { SubTopic, SubTopicResponse } from "@/constants/LessonTypes";
  import Colors from "@/constants/Colors"; 
  import SubTopicCard from "@/components/subject/SubTopicCard"; 
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
  
  interface SubTopicProps {
    topicId: string;
    goback?: () => void;
  }
  
  export default function SubTopics({ topicId, goback }: SubTopicProps) {
    const [subTopics, setSubTopics] = useState<SubTopic[]>([]);
    const [loadingSubTopics, setLoadingSubTopics] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      if (topicId) {
        fetchSubTopics();
      }
    }, [topicId]);
    const fetchSubTopics = async () => {
      try {
        setLoadingSubTopics(true);
        const url = `https://mwalimu-smart.vercel.app/api/subtopics/${topicId}`;
        const response = await fetch(url);
  
        if (!response.ok) {
          throw new Error("Failed to fetch subtopics");
        }
  
        const data: SubTopicResponse = await response.json();
        setSubTopics(data.subTopics);
      } catch (err) {
        setError("Failed to fetch subtopics");
        console.error(err);
      } finally {
        setLoadingSubTopics(false);
      }
    };
  
    return (
      <View style={styles.container}>
        <Pressable hitSlop={20} style={styles.pressed} onPress={goback}>
        <Ionicons name="arrow-back-circle-outline" size={24} color={Colors.yellow} />
        <Text style={styles.back}>Go back</Text>
        </Pressable>
        {/* Loader */}
        {loadingSubTopics ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={Colors.yellow} />
            <Text style={styles.text}>Loading subtopics...</Text>
          </View>
        ) : subTopics.length > 0 ? (
         
          <FlashList
            data={subTopics}
            keyExtractor={(item) => item._id}
            renderItem={({ item,index }) => <SubTopicCard index={index} item={item} />}
            estimatedItemSize={20}
            ListEmptyComponent={()=>{
                return (
                    <Text style={styles.text}>This Topic has no subtopics</Text>
                )
            }}
          />
        ) : (
          
          <View style={styles.noData}>
            <Text style={styles.text}>No subtopics found</Text>
            <TouchableOpacity style={styles.retry} onPress={fetchSubTopics}>
              <Text style={styles.retryText}>Try again</Text>
            </TouchableOpacity>
          </View>
        )}
  
        {/* Error */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error: {error}</Text>
            <TouchableOpacity style={styles.retry} onPress={fetchSubTopics}>
              <Text style={styles.retryText}>Try again</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,

    },
    loader: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontSize: 16,
      color: Colors.white,
      textAlign: "center",
    },
    subTopicList: {
      marginTop: 10,
    },
    noData: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    errorContainer: {
      marginTop: 20,
      alignItems: "center",
    },
    errorText: {
      color: "red",
      fontSize: 16,
      marginBottom: 10,
    },
    retry: {
      backgroundColor: Colors.yellow,
      padding: 10,
      borderRadius: 5,
    },
    retryText: {
      color: Colors.white,
      fontWeight: "bold",
    },
    pressed: {
        marginVertical: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
    },
    back: {
        color: Colors.yellow,
        textDecorationLine: 'underline', 
        textDecorationColor: Colors.white,
        fontSize: 16,
    }
  });
  