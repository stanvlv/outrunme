/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect } from 'react';
import {PropsWithChildren} from 'react';
import { Image } from 'react-native';
import { Button, TextInput } from 'react-native';
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

  
  return (
    <SafeAreaView style={backgroundStyle}>
      <View>
      <Text style={styles.baseText} backgroundColor="#ff6600">
        OutRun Me
      </Text>
      </View>
      <View style={{ alignSelf: 'center', marginTop: 30 }}>
        <Image 
         source={require('./outrunme.png')}
         style={{ width: 200, height: 250 }}
        />
      </View>
      <Text style={styles.up}>UP FOR THE CHALLENGE?</Text>
      <View style={styles.container}>
      <TextInput 
        placeholder='Email' 
        value={text} 
        style={styles.input} 
        onChangeText={onChangeText} 
      />
      <TextInput 
        placeholder='Password' 
        value={password} 
        style={styles.input} 
        onChangeText={onChangePassword} 
      />
      <Button 
        title="Signup / Login" 
        color="#ff6600" 
        onPress={() => setShowData(true)}
      />
      { showData && <DisplayData text={text} password={password} /> }
    </View>
  
    </SafeAreaView>
  );
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
