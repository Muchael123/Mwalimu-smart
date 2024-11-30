import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import Colors from '@/constants/Colors';
import { Platform } from 'react-native';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Drawer 
    screenOptions={{ 
      drawerActiveBackgroundColor: 'transparent',
      drawerActiveTintColor: Colors.Subjectborder,
      drawerInactiveTintColor: Colors.SubjectSelected,
      drawerStyle: {
          zIndex: 100,
      }
  }}
    backBehavior='initialRoute' 
    initialRouteName='index'>

      <Drawer.Screen
        name="index" 
        
        options={{
          drawerLabel: 'My Profile',
          title: 'Settings',
        }}
      />
      <Drawer.Screen 
      name='edit-profile'

      />
    </Drawer>
  </GestureHandlerRootView>
  );
}
