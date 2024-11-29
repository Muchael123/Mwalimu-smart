import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useCallback, useState } from 'react'
import { useRouter } from 'expo-router'
import { useSignIn } from '@clerk/clerk-expo'
import OAuthLogin from './OAuthLogin'
import Colors from '@/constants/Colors'
import { Fontisto } from '@expo/vector-icons'
import Icon from '../Icon'

export default function LoginForm() {
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)  
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const handlePasswordChange = (text: string) => {
        setPassword(text)
    }
    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()


    const onSignInPress = useCallback(async () => {
        if (!isLoaded) {
          return
        }
    
        try {
            setLoading(true)
          const signInAttempt = await signIn.create({
            identifier: emailAddress,
            password,
          })
    
          if (signInAttempt.status === 'complete') {
            await setActive({ session: signInAttempt.createdSessionId })
            router.replace('/')
          } else {
            console.error(JSON.stringify(signInAttempt, null, 2))
          }
        } catch (err: any) {
          console.error(JSON.stringify(err, null, 2))
        }finally{
            setLoading(false)
        }
      }, [isLoaded, emailAddress, password])



  return (
    <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.text}>Login to Your Account</Text>
        <View style={styles.authForm}>
      <View >
        <Text style={styles.label}>Email</Text>
       <View style={styles.inputView}>
       <Fontisto name="email" size={24} color={Colors.authCol} />
       <TextInput
         placeholder="Enter your Email Address"
         placeholderTextColor={Colors.authCol}
         keyboardType='email-address'
         style={{color: Colors.yellow, flex: 1}}
         autoCapitalize='none'
         value={emailAddress}
         onChangeText={setEmailAddress}
         cursorColor={Colors.yellow}
         returnKeyType='next'
        />
       </View>
       </View>
       <View >
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputView}>
            <Fontisto name="locked" size={24} color={Colors.authCol} />
            <TextInput
              placeholder="Enter your Password"
              placeholderTextColor={Colors.authCol}
              secureTextEntry={secureTextEntry}
              style={{color: Colors.yellow, flex: 1}}
              value={password}
              onChangeText={handlePasswordChange}
              returnKeyType='next'
              cursorColor={Colors.yellow}
            />
            
            <Icon name={secureTextEntry? "eye" : "eye-off"} color={Colors.authCol} onPress={() => setSecureTextEntry(prev => !prev)} />
            </View>
            </View>

            <TouchableOpacity
            disabled={loading}
       style={styles.Next} >
        {
          loading ? <ActivityIndicator size={20} />:<Text style={styles.text}>Next</Text>
        }
      </TouchableOpacity>
       </View>
        <OAuthLogin/>
        </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 20,

    },
    text: {
        color: Colors['dark-gray'],
        fontSize: 24,
        fontWeight: 'bold'
    },
    label: {
        color: Colors.authCol,
        fontSize: 14,
        fontWeight: 'bold',
    },
    inputView: {
        backgroundColor: Colors.inputField,
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        alignItems: 'center',
      
    },
    authForm: {
      marginTop: 24,
      gap: 0,
    },
    pass: {
      color: Colors.yellow, 
      flex: 1,
      borderWidth: StyleSheet.hairlineWidth,
    },
    Next: {
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        marginTop:10,
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        backgroundColor: Colors.Subjectborder
      },
})