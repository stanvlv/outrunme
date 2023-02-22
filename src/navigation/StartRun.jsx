import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Map from '../screens/home/Map';
const Stack = createNativeStackNavigator();
export default function StartRun() {
  return (
    <Stack.Navigator
      initialRouteName="FindUser"
      screenOptions={{
        //  headerBackTitle: "Back", // only for IOS
        headerStyle: {
          backgroundColor: 'orange',
        },
      }}>
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
}
