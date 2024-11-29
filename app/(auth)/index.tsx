import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import Colors from '@/constants/Colors';
import Dimensions from '@/constants/Dimensions';
import RegisterForm from '@/components/signup/RegisterForm';
import VerifyOtp from '@/components/signup/VerifyOtp';

export default function Index() {
  const scrollRef = useRef<ScrollView>(null);
  const [page, setPage] = useState<number>(0);
  const [pendingVerification, setPendingVerification] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const scrollToPage = (index: number) => {
    console.log('scrolling to', index, index * Dimensions.scroll.width);
    const gap = 15;
    scrollRef.current?.scrollTo({
      x: index * Dimensions.scroll.width + (index > 0 ? gap : 0),
      animated: true,
    });
  };

  const handlePageNext = () => {
    setPage((prevIndex) => {
      const nextIndex = prevIndex + 1;
      scrollToPage(nextIndex);
      return nextIndex;
    });
  };

  const handlePageBack = () => {
    setPage((prevIndex) => {
      const prevPageIndex = prevIndex - 1;
      scrollToPage(prevPageIndex);
      return prevPageIndex;
    });
  };

  const handlePending = (msg: boolean) => {
    setPendingVerification(msg);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Step {page + 1} out of 3</Text>
      </View>

      <ScrollView
        ref={scrollRef}
        scrollEnabled={false}
        horizontal
        showsHorizontalScrollIndicator
        contentContainerStyle={styles.signupScroll}
      >
        <View style={styles.page}>
          <RegisterForm
            pendingVerification={pendingVerification}
            setPendingVerification={handlePending}
            setnextPage={handlePageNext}
            email={email}
            setEmail={setEmail}
          />
        </View>
        <View style={styles.page}>
          <VerifyOtp email={email} setnextPage={handlePageNext} setprevPage={handlePageBack} />
        </View>
        <View style={styles.page}>
          <Pressable onPress={handlePageBack}>
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
    backgroundColor: Colors.SubjectCard,
  },
  header: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  headerText: {
    color: '#939393',
    fontSize: 20,
    fontWeight: '600',
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
    fontWeight: '300',
    marginTop: 10,
  },
});
