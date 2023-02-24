import React from 'react' // not sure if needed
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import all the screens for Auth
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import ForgotPassword from '../screens/auth/ForgotPassword';
import BottomNavBar from './BottomNavBar';

const Stack = createNativeStackNavigator()
export default function AuthNavigator() {

    

    return (
       
<Stack.Navigator initialRouteName='Login' screenOptions={{
    //  headerBackTitle: "Back", // only for IOS
     headerStyle: {
        backgroundColor: "#FEF6ED"}
        ,
        }}>
        <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name='Home' component={BottomNavBar} />
</Stack.Navigator>

    )
}