// Screens
import Home from '../screens/home/Home'
import RunMap from '../screens/home/RunMap';
import FirebaseDatabase from '../screens/home/FirebaseDatabase';

import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'


// screen names
const homeName = "Home"
const runName = 'Run'
const firebase = "Firebase"


export default function BottomNavBar({ user }) {
  
console.log(user + ' this comes from bottom navbar')
  const Tab = createBottomTabNavigator();
  return (
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({route}) => ({
          // headerShown: false, // this can remove the header on top of each screen
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;
            
            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === firebase) {
              iconName = focused ? 'list' : 'list-outline';
            } else if (rn === runName) {
              iconName = focused ? 'settings' : 'settings-outline';
            }
            return <Ionicons name={iconName} size={30} color={color} />;
          },
        })}>
        <Tab.Screen name={homeName} component={Home} />
        <Tab.Screen name={runName} component={RunMap} />
        <Tab.Screen name={firebase} user={user} component={FirebaseDatabase} />
      </Tab.Navigator>
    
  );
}
