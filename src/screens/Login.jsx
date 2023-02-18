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
} from 'native-base';
import React from 'react';
import SignUp from './SignUp';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '456724083654-jlu3nsqdlhnhh2h4kkcfqf43u9vd3n1h.apps.googleusercontent.com',
});
export default function Login({navigation, SignUp}) {
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

  // create user with email and password
  const createUser = () => {
    auth()
      .createUserWithEmailAndPassword(`${email.name}`, `${password}`)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

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
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
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

  // logout the user
  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <NativeBaseProvider>
      {/* Form for the email */}
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}>
            Up for the challenge?
          </Heading>

          <VStack space={3} mt="5">
            <FormControl isInvalid={'name' in errors}>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                onChangeText={value => setEmail({...email, name: value})}
              />
              {'name' in errors ? (
                <FormControl.ErrorMessage>
                  {errors.name}
                </FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>{errors.name}</FormControl.HelperText>
              )}
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                onChangeText={value => setPassword({...password, name: value})}
              />
              <Link
                _text={{
                  fontSize: 'xs',
                  fontWeight: '500',
                  color: 'indigo.500',
                }}
                alignSelf="flex-end"
                mt="1">
                Forget Password?
              </Link>
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={loginUser}>
              Sign in
            </Button>
            <Button mt="2" colorScheme="indigo" onPress={signWithGoogle}>
              Signup with Google
            </Button>
            <Button mt="2" colorScheme="indigo" onPress={createUser}>
              Register
            </Button>
            <Button mt="2" colorScheme="indigo" onPress={logout}>
              Logout
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}>
                I'm a new user.{' '}
              </Text>
              <Link
                _text={{
                  color: 'indigo.500',
                  fontWeight: 'medium',
                  fontSize: 'sm',
                }}
                onPress={() => navigation.navigate('signUpName')}>
                Sign Up
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}
