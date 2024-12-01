import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import Colors from '@/constants/Colors';
export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Drawer 
    screenOptions={{ 
    
      drawerActiveBackgroundColor: 'transparent',
      drawerActiveTintColor: Colors.Subjectborder,
      drawerInactiveTintColor: Colors.SubjectSelected,
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
