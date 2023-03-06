import 'react-native-gesture-handler';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {NativeBaseProvider} from 'native-base';
import auth from '@react-native-firebase/auth';
import AuthNavigator from './src/navigation/AuthNavigator';
import BottomNavBar from './src/navigation/BottomNavBar';

export const AppStateContext = React.createContext();

const AppStateProvider = props => {
  const {user} = props;
  const [isChallenged, setIsChallenged] = useState(false);
  const [run, setRun] = useState({showMap: false});
  const contextValue = {user, run, isChallenged, setIsChallenged, setRun};

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


  // sending alert when receiving a notification
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    //  Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
      });
    return unsubscribe;
  }, []);

  // 
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  

  return (
    <NativeBaseProvider>
      <AppStateProvider user={user}>
        <NavigationContainer>
          {user ? <BottomNavBar /> : <AuthNavigator />}
        </NavigationContainer>
      </AppStateProvider>
    </NativeBaseProvider>
  );
}
