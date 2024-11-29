import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { Link } from 'expo-router'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'
import VericalLine from '../signup/VericalLine'
import Icon from '../Icon'
import Colors from '@/constants/Colors'

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function OAuthLogin() {
    useWarmUpBrowser()
    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
    
    const handleLogin  =  useCallback(async () => {
      try {
        const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
          redirectUrl: Linking.createURL('/(auth)', { scheme: 'myapp' }),
        })
  
        if (createdSessionId) {
          setActive!({ session: createdSessionId })
        } else {
          // Use signIn or signUp for next steps such as MFA
        }
      } catch (err) {
        console.error('OAuth error', err)
      }
    }, [])
  
    return (
        <View style={styles.container}>
          <VericalLine />
          <TouchableOpacity onPress={handleLogin} style={styles.Next} >
            <Icon name="logo-google" color={Colors['dark-gray']} />
            <Text style={styles.btnText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>
      )
    }
    
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            paddingVertical: 10,
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
        },
        Next: {
            padding: 20,
            borderRadius: 20,
            alignItems: 'center',
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'center',
            borderColor: Colors['dark-gray'],
            borderWidth: 2,
          },
          btnText: {
            color: Colors['dark-gray'],
            fontWeight: 'bold',
            fontSize: 16,
    
          }
      
    })