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

GoogleSignin.configure({
  webClientId:
    '456724083654-jlu3nsqdlhnhh2h4kkcfqf43u9vd3n1h.apps.googleusercontent.com',
});
export default function Login({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [alert, setAlert] = React.useState('');

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
      .signInWithEmailAndPassword(`${email.name}`, `${password}`)
      .then(() => {
        console.log('User account signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          setAlert('orange');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          setAlert('red');
        }

        console.error(error);
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
    <ScrollView style={{backgroundColor: styles.appColor.orange}}>
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
          <Heading
            marginTop="1"
            size="lg"
            fontWeight="800"
            color="#000"
            _dark={{
              color: 'warmGray.50',
            }}>
            OutRun Me
          </Heading>
          <Image
            source={require('../../assets/outrunmetrans.png')}
            style={{
              width: 175,
              height: 175,
              backgroundColor: 'transparent',
              resizeMode: 'contain',
            }}
          />
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading style={styles.heading}
              ><Text style={styles.textColor}>
              Up for the challenge?
              </Text>
              </Heading >

            <VStack space={3} mt="5">
              <FormControl isInvalid={'name' in errors}>
                <FormControl.Label ><Text style={styles.textColor}>Email</Text></FormControl.Label>
                <Input
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
                 backgroundColor="#FEF6ED"
                  type="password"
                  onChangeText={value =>
                    setPassword({...password, name: value})
                  }
                />
                <Link
                  onPress={() => navigation.navigate('ForgotPassword')}
                  _text={{
                    fontSize: 'xs',
                    fontWeight: '500',
                    color: '#1A265A',
                  }}
                  alignSelf="flex-end"
                  mt="1">
                  Forget Password?
                </Link>
              </FormControl>
              <Box style={{display: 'flex', flexDirection: 'row'}}>
                <Button style={styles.loginButton} onPress={loginUser}>
                 <Text style={styles.loginButtonText}> Sign in </Text>
                </Button>
                <Button style={styles.loginButton}>
                  <Image
                    source={require('../../assets/googleicon.png')}
                    style={{width: 30, height: 30}}
                    onPress={signWithGoogle}
                  />
                </Button>
              </Box>

              {/* <Button mt="2" colorScheme="indigo" onPress={createUser}>
              Register
            </Button> */}

              <HStack mt="6" justifyContent="center">
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
                    color: '#fff',
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
  );
}

