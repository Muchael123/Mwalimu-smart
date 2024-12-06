import { View, StyleSheet, FlatList, Pressable, Text } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Question } from '@/constants/LearningTypes';
import QuizCard from './QuizCard';
import Dimensions from '@/constants/Dimensions';
import Colors from '@/constants/Colors';

interface QuizProps {
  Quizes: Question[];
  setcurr: (index: number) => void;
}

const QuizView = ({ Quizes, setcurr }: QuizProps) => {
  const [enabled, setEnabled] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatRef = useRef<FlatList>(null);

  const goToNext = (curIndex: number) => {
    if (curIndex < Quizes.length - 1) {
     setcurr(curIndex + 1)
     setCurrentIndex(curIndex);
     flatRef.current?.scrollToIndex({ index: curIndex + 1 });
     setEnabled(true);
    }
  };
  useEffect(() => {
    flatRef.current?.scrollToIndex({ index: currentIndex,animated: true });
  },[])

  return (
    <View style={styles.container}>
      <FlatList
        data={Quizes}
        ref={flatRef}
        scrollEnabled={false}
        horizontal
        style={{width: Dimensions.screenWidth}}
        contentContainerStyle={{padding: 20}}
        showsHorizontalScrollIndicator={false}
        renderItem={( {item, index} ) => (
          <QuizCard Quiz={item}
           enabled={enabled} 
           index={index}
           goToNext={goToNext}
           setEnabled={setEnabled} 
           />
        )}
        keyExtractor={(item) => item._id}
        
      />
    
    </View>
  );
};

export default QuizView;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.inputField,
    
      
    },
    text: {
      fontSize: Dimensions.screenWidth > 360 ? 20 : 18,
      color: Colors.white,
    },
    quizView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    quizHeader: {
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
    texthead: {
      fontSize: Dimensions.screenWidth > 360 ? 18 : 16, 
      color: Colors.search,
      fontWeight: 'semibold',
      letterSpacing: 1.2,
    },
    action: {
      width: '100%',
      padding: 20,
      backgroundColor: Colors.yellow,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    pressed: {
      width: '100%',
      padding: 20,
      backgroundColor: Colors.yellow,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      opacity: 0.5,
    },
    texthead1: {
      fontSize: 20,
      color: Colors.inputField,
      fontWeight: 'semibold',
      letterSpacing: 1.2,
    },
  });
  