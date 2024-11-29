import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import Colors from '@/constants/Colors';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Dimensions from '@/constants/Dimensions';
interface VerifyOtpProps {
    setnextPage: () => void;
    setprevPage: () => void;
  email: string;
}
export default function VerifyOtp({setnextPage, setprevPage, email}: VerifyOtpProps) {
    const [code, setCode] = useState(['', '', '', '', '', '']); 
    const inputsRef = useRef<TextInput[]>([]);
    const router = useRouter();
    const { isLoaded, signUp, setActive } = useSignUp();
    const [loading, setLoading] = useState<boolean>(false);

    const onPressVerify = async () => {
        setLoading(true);
        if (!isLoaded) {
            return;
        }
        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: code.join(''),
            });
            console.log('completeSignUp...', completeSignUp);

            if (completeSignUp.status === 'complete') {
                await setActive({ session: completeSignUp.createdSessionId });
                setnextPage();
            } else {
                console.error( 'responses',JSON.stringify(completeSignUp, null, 2));
            }
        } catch (err: any) {
            const error = err.errors[0]
            console.log('error', error);
            alert(error?.longMessage);
        } finally{
            setLoading(false);
        }
    };

    const handleInputChange = (text: string, index: number) => {
        const updatedCode = [...code];
        updatedCode[index] = text;
        setCode(updatedCode);
        console.log( code, "from code");
        if (text && index < inputsRef.current.length - 1) {
            inputsRef.current[index + 1]?.focus(); 
        }
        if(code.every((digit) => digit !== '')) {
            onPressVerify();
        }
        
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Account Verification</Text>
            <Text style={styles.emailTxt}>We sent an email with Verification code to {email}. Enter the code below</Text>
            <View style={styles.inputContainer}>
                {code.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={styles.otpInput}
                        maxLength={1}
                        keyboardType="numeric"
                        cursorColor={Colors.Subjectborder}
                        returnKeyType={ index === code.length - 1 ? 'done' : 'next'}
                        onChangeText={(text) => handleInputChange(text, index)}
                        ref={(ref) => (inputsRef.current[index] = ref!)} 
                        value={digit}
                    />
                ))}
            </View>
           <View style={styles.btnView}>
            <TouchableOpacity style={styles.backBtn} onPress={()=> setprevPage()}>
                <Text  style={styles.backBtnText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
            disabled = {loading || code.some((digit) => digit === '') }
            onPress={onPressVerify}
             style={[styles.btn, {
                backgroundColor: loading || code.some((digit) => digit === '') ? Colors.search : Colors['dark-gray'],
             }]}>
                {
                    loading ? (
                        <Ionicons name="refresh" size={24} color={Colors.black} />
                    ) : (
                        <Text style={styles.btnText}>Verify</Text>
                    )
                }
            </TouchableOpacity>
           </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: Colors['dark-gray'],
        fontSize: 24,
        fontWeight: 'bold',
        
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    otpInput: {
        height: 50,
        width: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 28,
        color: Colors.Subjectborder,
        fontWeight: 'bold',
    },
      btnText: {
        color: Colors.black,
        fontWeight: 'bold',
        fontSize: 20,
      },
      btn : {
        padding: 20,
        backgroundColor: Colors.yellow,
        borderRadius: 10,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      btnView: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        gap:20,
        justifyContent: 'space-between',
        marginTop:  50,
      },
      backBtn: {
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderColor: Colors['dark-gray'],
        borderWidth: 1,
      },
        backBtnText: {
            color: Colors['dark-gray'],
            fontWeight: 'bold',
            fontSize: 20,
        },
        emailTxt: {
            color: '#939393',
            fontSize: 16,
            fontWeight: 'semibold',
            marginTop: 10,
            marginBottom: 20,
            textAlign: 'center',
        }
});
