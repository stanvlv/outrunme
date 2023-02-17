// Screens
import Home from '../screens/Home'
import RunMap from '../screens/RunMap';
import Login from '../screens/Login';

import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import SignUp from '../screens/SignUp';
import FirebaseDatabase from '../screens/FirebaseDatabase';

// screen names
const homeName = "Home"
const loginName = "Login"
const runName = 'Run'
const firebase = "Firebase"


export default function BottomNavBar() {

  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer independent={true}>
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
        <Tab.Screen name={loginName} options={{title: 'Login'}}>
          {props => <Login {...props} SignUp={SignUp} />}
        </Tab.Screen>
        <Tab.Screen name={runName} component={RunMap} />
        <Tab.Screen name={firebase} component={FirebaseDatabase} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
