import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '@/constants/Colors'
import { Subject } from '@/constants/LessonTypes'
import GetLevelSubjects from '@/hooks/GetLevelSubjects'
import { useRouter } from 'expo-router'
import { RefreshControl } from 'react-native-gesture-handler'

interface UnitsProps {
  id: string | undefined
}
export default function Units({id}: UnitsProps) {
  const [units, setUnits] = useState<Subject[] | undefined>()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  useEffect(() => {
    
    fetchData();
  }, [id])
  const fetchData = async () => {
    if (!id) return;
    try{
      const data = await GetLevelSubjects(id);
    setUnits(data?.subjects);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch subjects");
    } finally{
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.container}>
          <Text style={styles.text}>Loading...</Text>
        </View>
      ) : (
        <FlatList
        data={units}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchData} />}
        ListEmptyComponent={<Text style={styles.text}>No subjects found</Text>}
        refreshing={loading}
        style={{ width: '100%', gap:10, padding: 8, borderRadius: 20 }}
        columnWrapperStyle={{ justifyContent: 'space-between', gap: 4 }}
        numColumns={2}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push({
              pathname: '/(tabs)/(home)/[id]',
              params: {
                id: item._id,
                name: item.name
              }
            })}
            style={styles.unit}
          >
            <Text style={styles.text}>{item.name}</Text>
          </Pressable>
        
        )}
        keyExtractor={(item) => item._id}
      />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:16
  },
  text: {
    color: Colors.white,
    textAlign: 'center',
  },
  unit: {
    padding: 24,
    backgroundColor: Colors.SubjectTextSelected,
    flex: 1,
    maxWidth: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    // flexWrap: 'wrap',
  }
 
  
})