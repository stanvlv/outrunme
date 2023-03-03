import {
  Box,
  NativeBaseProvider,
  FormControl,
  Input,
  Center,
  VStack,
  Link,
  Button,
  HStack,
  Text,
} from 'native-base';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Image, ScrollView} from 'react-native';
import {styles} from '../../styles/Style';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {TouchableOpacity} from 'react-native';

GoogleSignin.configure({
  webClientId:
    '456724083654-jlu3nsqdlhnhh2h4kkcfqf43u9vd3n1h.apps.googleusercontent.com',
});
export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});



  // login with email and password
  const loginUser = () => {
    auth()
      .signInWithEmailAndPassword(`${email.name}`, `${password.name}`)
      .then(() => {
        console.log('User account signed in!');
        console.log(password.name);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          alert('Email already in use');
        }
        if (error.code === 'auth/invalid-email') {
          alert('Wrong email');
        }
        if (error.code === 'auth/invalid-password') {
          alert('Wrong password');
        }
        alert(error);
      });
  };

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  // signin with Google Account
  const signWithGoogle = () => {
    onGoogleButtonPress().then(() => console.log('Signed in with Google!'));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView>
        <NativeBaseProvider>
         

          {/* Form for the email */}

          <Center w="100%">
            <Image
              source={require('../../assets/isitgood.png')}
              style={{
                width: 250,
                height: 230,
                backgroundColor: 'transparent',
                resizeMode: 'contain',
              }}
            />
            <Box safeArea p="2" py="0" w="90%" maxW="290">
              <VStack space={0}>
                <FormControl isInvalid={'name' in errors}>
                  <FormControl.Label>
                    <Text style={styles.textColor}>Email</Text>
                  </FormControl.Label>
                  <Input
                    placeholder="Enter email"
                    backgroundColor="#FEF6ED"
                    onChangeText={value => setEmail({...email, name: value})}
                  />
                 
              </FormControl>
              <FormControl>
                <FormControl.Label><Text style={styles.textColor}>Password</Text></FormControl.Label>
                <Input
                placeholder='Enter password'
                 backgroundColor="#FEF6ED"
                 marginBottom='3'
                  type="password"
                  onChangeText={value =>
                    setPassword({...password, name: value})
                  }
                />
               
              </FormControl>
              <FormControl>
              <Box style={{display: 'flex', flexDirection: 'column'}}>
                
                <Button onPress={loginUser} colorScheme="warning" >LOGIN</Button>
                <Link
                  onPress={() => navigation.navigate('ForgotPassword')}
                  _text={{
                    fontSize: 'xs',
                    fontWeight: '500',
                    color: '#1A265A',
                  }}
                  alignSelf="flex-end"
                  mt="3">
                  Forgot Password?
                </Link>
                <Text style={{borderBottomColor: 'black', borderBottomWidth: 0.5, borderBottomColor: '#F1600D'}}></Text>
                  </Box>
                </FormControl>
                <Box style={{display: 'flex', flexDirection: 'column'}}>

                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      gap: 5,
                    }}>
                    <Button style={styles.googleButton}>
                      <Image
                        source={require('../../assets/googleicon.png')}
                        style={{width: 30, height: 30}}
                        onPress={signWithGoogle}
                      />
                    </Button>
                    <Button style={styles.googleButton}>
                      <Image
                        source={require('../../assets/facebooktrans.png')}
                        style={{width: 30, height: 30}}
                      />
                    </Button>
                  </Box>
                </Box>

                <HStack mt="5" justifyContent="center">
                  <Text
                    fontSize="sm"
                    color="coolGray.800"
                    _dark={{
                      color: 'warmGray.200',
                    }}>
                    Become a challenger:{' '}
                  </Text>
                  <TouchableOpacity>
                    <Link
                      _text={{
                        color: '#F1600D',
                        fontWeight: 'medium',
                        fontSize: 'sm',
                      }}
                      onPress={() => navigation.navigate('Register')}>
                      Sign Up
                    </Link>
                  </TouchableOpacity>
                </HStack>
              </VStack>
            </Box>
          </Center>
        </NativeBaseProvider>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
