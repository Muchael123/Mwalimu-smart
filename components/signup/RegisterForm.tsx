import { KeyboardAvoidingView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Fontisto from '@expo/vector-icons/Fontisto';
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from '../Icon';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

interface RegisterFormProps {
  scrollToNext: (index: number) => void;
  pendingVerification: boolean;
  setPendingVerification: (pend: boolean) => void;
  email: string;
  setEmail: (email: string) => void;
  setpage? : (page: number) => void;
}

export default function RegisterForm({scrollToNext, pendingVerification, setPendingVerification, email, setEmail, setpage}: RegisterFormProps) {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [pasmismatch, setPasmismatch] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [consecure, setConsecure] = useState<boolean>(true);
  const { isLoaded, signUp, setActive } = useSignUp();
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  
    const handlePasswordChange = (text: string) => {
        setPassword(text);
    }
    const handleConfirmPasswordChange = (text:string) => {
        setConfirmPassword(text);
    }
    const Checkpassmismatch = () => {
        if (password !== confirmPassword) {
            return true
        } else {
            return false;
        }
    }

    const verifyEmail = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
      return typeof email === "string" && email.length > 0 && emailRegex.test(email);
  };
  

    const handleNext = () => {
      setLoading(true);
       try{
        if(!verifyEmail()) {
          alert('Please enter a valid email');
          return;
        }
        if(password.length < 6) {
          alert('Password must be at least 6 characters');
          return;
        }
        if(Checkpassmismatch()) {
          alert('Passwords do not match');
          return;
        }
        ClerkVerify();
       } catch (error) {
          console.log(error);
       }finally {
          setLoading(false);
       }
    }


    const ClerkVerify = async () => {
      console.log('Clerk Verify');
      if (!isLoaded) {
        console.log('Clerk is not loaded');
        return
      }
      try {
        await signUp.create({emailAddress: email, password});
        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
        console.log('Email Verification Sent');
        setPendingVerification(true);
        scrollToNext(2);
        {setpage && setpage(2)}  
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } catch (error) {
        console.log(error);
      } 
    }


  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.text}>Your Account</Text>

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
         value={email}
         onChangeText={setEmail}
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
            <View >
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.inputView}>
            <Fontisto name="locked" size={24} color={Colors.authCol} />
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor={Colors.authCol}
              secureTextEntry={consecure}
              style={[styles.pass, { borderColor: pasmismatch ? 'red' : 'transparent'}]}
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              cursorColor={Colors.yellow}
              returnKeyType='done'
            />
            <Icon name={consecure? "eye" : "eye-off"} color={Colors.authCol} onPress={() => setConsecure(!consecure)} />
            </View>
            </View>
      </View>
      <TouchableOpacity style={styles.Next} onPress={handleNext}>
        {
          loading ? <Ionicons name="reload" size={24} color={Colors.yellow} />:<Text style={styles.text}>Next</Text>
        }
      </TouchableOpacity>
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
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20
    },
    inputView: {
        backgroundColor: Colors.inputField,
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        alignItems: 'center'
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
      backgroundColor: Colors.Subjectborder,
      padding: 20,
      borderRadius: 20,
      alignItems: 'center',
      marginTop: 25,
      flexDirection: 'row',
      gap: 10,
      justifyContent: 'center'
    }
})