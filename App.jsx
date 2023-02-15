/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {MapView} from "react-native-maps";
import { Button } from "native-base"
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, Box } from "native-base";
import React, {useState, useEffect } from 'react';
import {PropsWithChildren} from 'react';
import { Image } from 'react-native';
import { TextInput } from 'react-native';
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



function Section({children, title}) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function DisplayData({ text, password }) {
  return (
    <View>
      <Text style={styles.dataText}>
        Email: {text}
      </Text>
      <Text style={styles.dataText}>
        Password: {password}
      </Text>
    </View>
  );
}


function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [showData, setShowData] = useState(false);

  const onChangeText = text => setText(text);
  const onChangePassword = password => setPassword(password);

  
  return ( <NavigationContainer>
    <NativeBaseProvider>
      <Box>Hello world</Box>
    
    <Button>Native base</Button>
    </NativeBaseProvider>
    {/* <MapView
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  /> */}
    </NavigationContainer>);
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,   
    
  },
  up: {
    fontFamily: "Cochin",
    color: "black",
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    
  },
  baseText: {
    fontFamily: "Cochin",
    color: "white",
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
    marginTop: 10,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
