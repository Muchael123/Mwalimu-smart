import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Redirect, Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { StatusBar, StyleSheet, useAnimatedValue, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import tokenCache from '@/hooks/Tokencache';


function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons style={{bottom: '-50%'}} size={28}  {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const getToken = tokenCache.getToken('userToken');
  if (!getToken) {
    return <Redirect href={'/(auth)'} />;
  }
  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
      />
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      tabBarShowLabel: false,
     
      tabBarStyle: {
        position: "absolute",
        bottom: 8,
        backgroundColor: "#121416",
        borderRadius: 65,
        flexDirection: "row",
        height: 65,
        marginHorizontal: 50,

      },
      
        headerShown: useClientOnlyValue(false, true),
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
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
