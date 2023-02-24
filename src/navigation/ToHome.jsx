import React from 'react'; // not sure if needed
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home/Home';

const Stack = createNativeStackNavigator();
export default function ToHome() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        //  headerBackTitle: "Back", // only for IOS
        headerStyle: {
          backgroundColor: 'orange',
        },
      }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
