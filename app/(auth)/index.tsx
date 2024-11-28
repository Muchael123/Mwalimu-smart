import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import Colors from '@/constants/Colors';
import Dimensions from '@/constants/Dimensions';
import RegisterForm from '@/components/signup/RegisterForm';

export default function Index() {
  const scrollRef = useRef<ScrollView>(null);
  const scrollToNext = (index: number) => {
    scrollRef.current?.scrollTo({
      x: Dimensions.scroll.width * index+15,
      animated: true,
    });
  };
  const [page, setPage] = useState<number>(1);
  const [pendingVerification, setPendingVerification] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const handlePending = (msg: boolean) => {
    setPendingVerification(msg);
  }
  const handlepageChange = (index: number) => {
    setPage(index);
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>step {page} out of 3</Text>
      </View>

      <ScrollView
        ref={scrollRef}
        scrollEnabled={false}
        horizontal={true} 
        showsHorizontalScrollIndicator={true} 
        contentContainerStyle={styles.signupScroll} 
      >
        <View  style={styles.page}>
          <RegisterForm 
          pendingVerification={pendingVerification}
            setPendingVerification={handlePending}
           scrollToNext={scrollToNext}
           email={email}
              setEmail={setEmail}
                setpage={handlepageChange}
              
            />
        </View>
        <View style={styles.page}>
        <Pressable onPress={() => scrollToNext(2)}>
          <Text style={styles.text}>Page 2</Text>
          </Pressable>
        </View>
        <View style={styles.page}>
        <Pressable onPress={() => scrollToNext(-1)}>
          <Text style={styles.text}>Page 3</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.SubjectCard
  },
  header: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  headerText: {
    color: '#939393',
    fontSize: 20,
    fontWeight: 'semibold',
    letterSpacing: 2, 
  },
  signupScroll: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  page: {
    width: Dimensions.scroll.width,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 20,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headersub: {
    color: '#dedede',
    fontSize: 16,
    fontWeight: 'light',
    marginTop: 10,
  }
});
