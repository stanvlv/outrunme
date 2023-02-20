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
import React, {useEffect, useState} from 'react';
import {Button, NativeBaseProvider} from 'native-base';

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {ScrollView} from 'native-base';
import AuthNavigator from './src/navigation/AuthNavigator';
import BottomNavBar from './src/navigation/BottomNavBar';

export const AppStateContext = React.createContext();

const AppStateProvider = props => {
  const {user} = props;
  const contextValue = {user};

  return (
    <AppStateContext.Provider value={contextValue}>
      {props.children}
    </AppStateContext.Provider>
  );
};

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

  console.log(user + ' this comes from app.jsx object');
  console.log(user?.uid + ' this should be the uid that comes from app.jsx');


console.log(user + " this comes from app.jsx objssect")
console.log(user?.uid + " this should be the uid that comes from app.jsx")

  return ( <NativeBaseProvider>
    <AppStateProvider user={user}>
      <NavigationContainer>
        {user ? <BottomNavBar /> : <AuthNavigator />}
      </NavigationContainer>
    </AppStateProvider>
  </NativeBaseProvider>

  );
}

// const styles = StyleSheet.create({});
