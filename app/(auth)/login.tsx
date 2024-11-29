import { StyleSheet, View } from 'react-native'

import LoginForm from '@/components/login/LoginForm'

export default function Login() {
 
  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  }
})