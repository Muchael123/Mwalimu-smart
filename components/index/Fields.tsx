import { StyleSheet, Text, View, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Subjects from './Subjects'
import { Lesson, LessonResponse } from '@/constants/LessonTypes'
import GetLessons from '@/hooks/GetLessons'
import Colors from '@/constants/Colors'
import Units from './Units'

export default function Fields() {
  const [levels, setLevels] = useState<LessonResponse | null>(null)
  const [selected, setSelected] = useState<Lesson | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [empty, setEmpty] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  const   handleSelected = (lesson: Lesson) => {
    setSelected(lesson)
  }

  useEffect(() => {
    getLevels()
  }, [])

  const getLevels = async () => {
    try {
      const data = await GetLessons()
     
      if (data && data.lessons.length > 0) {
        setLevels(data)
        setSelected(data.lessons[0])
        setEmpty(false)
      } else {
        setEmpty(true)
      }
    } catch (err) {
      setError("Failed to fetch lessons. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {error ? (
        <View>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable onPress={getLevels}>
            <Text style={styles.errorText}>Try again</Text>
          </Pressable>
        </View>
        
      ) : empty ? (
        <View style={styles.Empty}>
          <Text style={styles.emptyText}>No level of education Yet available.</Text>
          <Pressable onPress={getLevels}>
            <Text style={styles.emptyText}>Try again</Text>
          </Pressable>
        </View>
      ) : (
        <View>
        <Subjects
          pressed={handleSelected}
          selected={selected}
          subjects={levels?.lessons || null}
          getlevels={getLevels}
        />
        <Units id={selected?._id} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    backgroundColor: Colors.btnText,
    gap: 20,
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyText: {
    color: Colors.authCol,
    fontSize: 16,
    textAlign: 'center',
  },
  Empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
})
