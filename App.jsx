import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {MapView} from 'react-native-maps';
import {Button} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
import {useNavigation} from '@react-navigation/native';
import SignUp from './src/screens/SignUp';
import Login from './src/screens/Login';



import {NativeBaseProvider, Box} from 'native-base';
import React, {useState, useEffect} from 'react';
import {PropsWithChildren} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavBar from './src/components/BottomNavBar';



export default function App() {
  
  return (
 
    <BottomNavBar />
 ) 

}

const styles = StyleSheet.create({});
