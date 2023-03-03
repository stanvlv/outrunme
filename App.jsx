import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import { NativeBaseProvider} from 'native-base';


import auth from '@react-native-firebase/auth';
import AuthNavigator from './src/navigation/AuthNavigator';
import BottomNavBar from './src/navigation/BottomNavBar';

export const AppStateContext = React.createContext();

const AppStateProvider = props => {
  const {user} = props;
  const [isChallenged, setIsChallenged] =  useState(false)
  const [run, setRun] =  useState({showMap: false})
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

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;






  return ( <NativeBaseProvider>
    <AppStateProvider user={user}>
      <NavigationContainer>
        {user ? <BottomNavBar /> : <AuthNavigator />}
      </NavigationContainer>
    </AppStateProvider>
  </NativeBaseProvider>

  );
}


