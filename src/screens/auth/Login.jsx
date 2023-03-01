import {
  Box,
  NativeBaseProvider,
  FormControl,
  Stack,
  Input,
  WarningOutlineIcon,
  Center,
  Heading,
  VStack,
  Link,
  Button,
  HStack,
  Text,
  Alert,
  IconButton,
  CloseIcon,
} from 'native-base';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Ionicons from 'react-native-vector-icons/Ionicons';
import googleicon from '../../assets/googleicon.png';
import {Image, ScrollView} from 'react-native';
import {styles} from '../../styles/Style';
import { KeyboardAvoidingView, Platform } from 'react-native';

GoogleSignin.configure({
  webClientId:
    '456724083654-jlu3nsqdlhnhh2h4kkcfqf43u9vd3n1h.apps.googleusercontent.com',
});
export default function Login({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({});

  // const validate = () => {
  //   if (email.name === undefined) {
  //     setErrors({...errors, name: 'Name is required'});
  //     return false;
  //   } else if (email.name.length < 3) {
  //     setErrors({...errors, name: 'Name is too short'});
  //     return false;
  //   }

  //   return true;
  // };
  // console.log(email);
  // console.log(errors);

  // const onSubmit = () => {
  //   validate() ? console.log('Submitted') : console.log('Validation Failed');
  // };

  // login with email and password
  const loginUser = () => {
    auth()
      .signInWithEmailAndPassword(`${email.name}`, `${password.name}`)
      .then(() => {
        console.log('User account signed in!');
        console.log(password.name)
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          alert('Email already in use');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          alert('Wrong email');
        }

        if(error.code === 'auth/invalid-password') {
          console.log('That password is wrong')
          alert('Wrong password')
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
    style={{ flex: 1 }}
  >
    <ScrollView >
      <NativeBaseProvider>
        {/* {alert && (
        <Box>
          <Alert w="100%" status={alert === 'red' ? 'error' : 'warning'}>
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <Ionicons
                  name="alert"
                  size={30}
                  color={alert === 'red' ? 'red' : 'orange'}
                />
                <Text fontSize="md" color="coolGray.800">
                  {alert === 'red'
                    ? 'That email address is invalid!'
                    : 'That email address is already in use!'}
                </Text>
              </HStack>
              <Button>
                <Ionicons name="close" size={30} color="black" />
              </Button>
            </HStack>
          </Alert>
        </Box>
      )} */}

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
           

            <VStack space={0} >
              <FormControl isInvalid={'name' in errors}>
                <FormControl.Label ><Text style={styles.textColor}>Email</Text></FormControl.Label>
                <Input
                placeholder='Enter email'
                backgroundColor="#FEF6ED"
                  onChangeText={value => setEmail({...email, name: value})}
                />
                {/* {'name' in errors ? (
                <FormControl.ErrorMessage>
                  {errors.name}
                </FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>{errors.name}</FormControl.HelperText>
              )} */}
              </FormControl>
              <FormControl>
                <FormControl.Label><Text style={styles.textColor}>Password</Text></FormControl.Label>
                <Input
                placeholder='Enter password'
                 backgroundColor="#FEF6ED"
                  type="password"
                  onChangeText={value =>
                    setPassword({...password, name: value})
                  }
                />
               
              </FormControl>
              <Box style={{display: 'flex', flexDirection: 'column'}}>
                <Button style={styles.loginButton} onPress={loginUser}>
                 <Text style={styles.loginButtonText}> LOGIN </Text>
                </Button>
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
        
               <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', gap: 5}}>
                
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

              {/* <Button mt="2" colorScheme="indigo" onPress={createUser}>
              Register
            </Button> */}

              <HStack mt="5" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.800"
                  _dark={{
                    color: 'warmGray.200',
                  }}>
                  Become a challenger:{' '}
                </Text>
                <Link
                  _text={{
                    color: '#F1600D',
                    fontWeight: 'medium',
                    fontSize: 'sm',
                  }}
                  onPress={() => navigation.navigate('Register')}>
                  Sign Up
                </Link>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </NativeBaseProvider>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

