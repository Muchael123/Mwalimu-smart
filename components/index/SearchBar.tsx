import {  Animated, Keyboard, StyleSheet,  TextInput,  TouchableOpacity, useAnimatedValue, View } from 'react-native'
import React, {  useEffect, useState } from 'react'
import Colors from '@/constants/Colors'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useRouter } from 'expo-router';

export default function SearchBar() {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState<string>('')
  const handleChanges = (text: string) => {
    console.log(text)
    setSearchValue(text)
  }
  const handleSearch = () => {
    Keyboard.dismiss()
    router.navigate(`/(modals)/${searchValue}`)
    console.log('searching')
  }

  const appearVal = useAnimatedValue(80)
  const springVal = useAnimatedValue(0)
  const AppearAnimation = () => {
    Animated.spring(springVal, {
      toValue: 100,
      bounciness: 20,
      useNativeDriver: true,
    }).start();
    Animated.timing(appearVal, {
      toValue: 100,
      duration: 500,
      delay: 1000,
      useNativeDriver: true,
    }).start();
  }
  useEffect(() => {
    AppearAnimation()
  }, [])


  return (
    <Animated.View style={[styles.container, 
    {
      transform: [{ scale: springVal.interpolate({ inputRange: [0,100], outputRange: [0, 1]})}],
    opacity: appearVal.interpolate({ inputRange: [80, 100], outputRange: [0, 1]})
    }]}>
      <TextInput
        style={{ flex: 1, color: 'white', fontSize: 14,  }}
        placeholder='Do you have a question?'
        autoCapitalize='none'
        returnKeyType= 'search'
        importantForAutofill='yes'
        inputMode='search'
        value={searchValue}
        cursorColor={Colors.search}
        onChangeText={(text) => {handleChanges(text)}}
        placeholderTextColor={Colors.search}/>
        {searchValue.length > 0 ? 
        <View style={{flexDirection:'row', gap:8, alignItems:'center'}}>
         <TouchableOpacity onPress={() => setSearchValue('')}>
         <FontAwesome name="times" size={20} color={Colors.search} /> 
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSearch}>
          <FontAwesome name="search" size={24} color={Colors.search} />
          </TouchableOpacity>
        </View>
          :
        <SimpleLineIcons name="microphone" size={20} color={Colors.search} />
        }
        
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors['dark-gray'],
    borderRadius: 14,
    padding: 4,
    paddingRight: 10,
    marginTop: 20,
  }
})