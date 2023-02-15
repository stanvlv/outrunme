/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import LoginSignup from './src/screens/LoginSignup';
import {MapView} from 'react-native-maps';
import {Button} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider, Box} from 'native-base';
import React, {useState, useEffect} from 'react';
import {PropsWithChildren} from 'react';
import {Image} from 'react-native';
import {TextInput} from 'react-native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';




export default function App() {
  return <NavigationContainer>
    <LoginSignup />
  </NavigationContainer>;
}

const styles = StyleSheet.create({
});
