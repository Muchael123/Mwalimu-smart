import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '@/constants/Colors'
import { Subject } from '@/constants/LessonTypes'
import GetLevelSubjects from '@/hooks/GetLevelSubjects'
interface UnitsProps {
  id: string | undefined
}
export default function Units({id}: UnitsProps) {
  const [units, setUnits] = useState<Subject[] | undefined>()
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const data = await GetLevelSubjects(id);
      setUnits(data?.subjects);
    };
    fetchData();
  }, [id])
  return (
    <View style={styles.container}>
      <FlatList
        data={units}
        numColumns={2}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => console.log(item)}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? 'rgb(210, 230, 255)'
                  : 'white'
              },
              
            ]}
          >
            <Text style={styles.text}>{item.name}</Text>
          </Pressable>
        
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  text: {
    color: Colors.SubjectSelected,
  },
 
  
})