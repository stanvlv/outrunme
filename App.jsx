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
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
