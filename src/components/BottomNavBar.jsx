// Screens
import LoginSignup from '../screens/LoginSignup';
import Home from '../screens/Home'
import RunMap from '../screens/RunMap';

import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'

// screen names
const homeName = "Home"
const loginName = "Login"
const runName = 'Run'




export default function BottomNavBar() {

  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === loginName) {
              iconName = focused ? 'list' : 'list-outline';
            } else if (rn === runName) {
              iconName = focused ? 'settings' : 'settings-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name={homeName} component={Home} />
        <Tab.Screen name={loginName} component={LoginSignup} />
        <Tab.Screen name={runName} component={RunMap} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
