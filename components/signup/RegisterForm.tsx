import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from '../Icon';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import FormLinks from './FormLinks';
import Oauth from './Oauth';
import Terms from './Terms';

interface RegisterFormProps {
  setnextPage: () => void;
  pendingVerification: boolean;
  setPendingVerification: (pend: boolean) => void;
  email: string;
  setEmail: (email: string) => void;
  setpage? : (page: number) => void;
}

export default function RegisterForm({setnextPage, pendingVerification, setPendingVerification, email, setEmail, setpage}: RegisterFormProps) {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [pasmismatch, setPasmismatch] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [consecure, setConsecure] = useState<boolean>(true);
  const { isLoaded, signUp } = useSignUp();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

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
          setError('Please enter a valid email');
          return;
        }
        if(password.length < 8) {
          setError('Password must be at least 8 characters');
          return;
        }
        if(Checkpassmismatch()) {
          setError('Passwords do not match');
          return;
        }
        setError('');
        ClerkVerify();
       } catch (error) {
          console.log("error...",error);
         
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
        setnextPage();
        {setpage && setpage(2)}  
        // setEmail('');
        // setPassword('');
        // setConfirmPassword('');
      } catch (error: any) {
        let errorMessage = "An unexpected error occurred.";

        if (Array.isArray(error)) {
            errorMessage = error[0]?.Error || errorMessage;
        } else if (typeof error === "object" && error?.message) {
            errorMessage = error.message;
        } else if (typeof error === "string") {
            errorMessage = error;
        }

        setError(errorMessage);
    }
    }


  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.text}>Your Account</Text>
      {
        error ? (
          <View style={styles.errorView}>
            <MaterialIcons name="error-outline" size={24} color="white" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null
      }
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
      <Terms/>
      <FormLinks />
      <TouchableOpacity
       style={styles.Next} onPress={handleNext}>
        {
          loading ? <Ionicons name="reload" size={24} color={Colors.yellow} />:<Text style={styles.text}>Next</Text>
        }
      </TouchableOpacity>
      <Oauth />
     
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
    errorView: {
      backgroundColor: 'red',
        borderRadius: 10,
        padding: 8,
        marginTop: 12,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',

    },
    errorText: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'semibold',
      maxWidth: '80%',
    },
   
})