import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';
// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import SignUp from './src/screens/SignUp';
import Login from './src/screens/Login';
import React from 'react';
import BottomNavBar from './src/components/BottomNavBar';
import MainStackNavigator from './src/navigation/MainStackNavigator';


export default function App() {
  
  return (
 
 <BottomNavBar />
  
  
 ) 

}

// const styles = StyleSheet.create({});
