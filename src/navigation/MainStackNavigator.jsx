import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomNavBar from "../components/BottomNavBar";
import Login from '../screens/Login'
import SignUp from "../screens/SignUp";


export default function MainStackNavigator() {

    const Stack = createStackNavigator();

  return (
    <>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
    <BottomNavBar />
    </>
  );
}
