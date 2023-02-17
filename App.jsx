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
import React, {useEffect, useState} from 'react';
import BottomNavBar from './src/components/BottomNavBar';
import MainStackNavigator from './src/navigation/MainStackNavigator';
import LoginApp from './src/components/LoginApp'
import { Button, NativeBaseProvider } from 'native-base';
import MainScreenComponent from './src/screens/MainScreenComponent';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'native-base';


export default function App() {


  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  
  if (initializing) return null;

  if (!user) {
    return (
      <Login />
    );
  }

  return (
    <MainScreenComponent />
  
  );
}

// const styles = StyleSheet.create({});
