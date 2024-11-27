import { DrawerLayoutAndroid, Keyboard, StyleSheet, Text, TextInput,  TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
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

  return (
    <View style={styles.container}>
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
        
    </View>
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