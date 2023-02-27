import React from 'react'; // not sure if needed
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FindUser from '../screens/home/FindUser';

const Stack = createNativeStackNavigator();
export default function ToFindUser({user}) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        //  headerBackTitle: "Back", // only for IOS
        headerStyle: {
          backgroundColor: 'orange',
        },
      }}>
      <Stack.Screen name="Search" component={FindUser} user={user} />
    </Stack.Navigator>
  );
}
