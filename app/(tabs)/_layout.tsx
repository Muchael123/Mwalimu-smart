import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Redirect, Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { KeyboardAvoidingView, Platform, StatusBar, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '@clerk/clerk-expo';


function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons style={{bottom: '-50%'}} size={28}  {...props} />;
}

export default function TabLayout() {
  const { isSignedIn } = useUser();
  if(!isSignedIn) {
    return <Redirect href={'/(auth)'} />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
      />
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.dark.tint,
      tabBarShowLabel: false,
     tabBarHideOnKeyboard: true,
      tabBarStyle: {
        position: "absolute",
        bottom: 8,
        backgroundColor: "#121416",
        borderRadius: 65,
        flexDirection: "row",
        height: 65,
        marginHorizontal: 50,

      },
      
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name="settings" color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="person-circle-outline" color={color} />,
        }}
      />
      
    </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
