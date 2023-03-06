import React from 'react';
import {
  Box,
  NativeBaseProvider,
  FormControl,
  Input,
  Center,
  Heading,
  VStack,
  Button,
  Text,
} from 'native-base';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';

import {styles} from '../../styles/Style';

export default function Register({navigation}) {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordRepeat, setPasswordRepeat] = React.useState('');
  const [errors, setErrors] = React.useState({});

  // create user with email and password
  const createUser = async () => {
    console.log(password.name + ' from createUser');
    console.log(passwordRepeat.name + ' from createUser');

    if (password.name !== passwordRepeat.name) {
      return alert(`Passwords don't match`);
    }

    const token = await messaging().getToken();
    console.log(token);

    auth()
      .createUserWithEmailAndPassword(`${email.name}`, `${password.name}`)
      .then(userCredential => {
        console.log('User account created & signed in!');

        // take the uid from the reg and get the users collection to make first post
        const {uid} = userCredential.user;
        const userRef = firestore().collection('users').doc(uid);

        // if username exist somewhere in the collection it shows an error
        userRef.get().then(doc => {
          if (doc.exists) {
            return console.log('Username already exists!');
          }

          userRef
            .set({
              username: username.name.toLowerCase(),
              challenges_won: 0,
              challenges_lost: 0,
              runs: 0,
              points: 0,
              streak: 0,
              fcmToken: token,
            })
            .then(() => {
              console.log('User data added to Firestore!');
              // Navigate to the next screen or do something else here
            })
            .catch(error => {
              console.error('Error adding user data to Firestore: ', error);
            });
        });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          alert('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          alert('That email address is invalid!');
        }
        console.error(error);
      });
  };

  return (
    <NativeBaseProvider>
      <Center w="100%">
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <Heading
            size="lg"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}
            fontWeight="bold">
            Welcome Challenger
          </Heading>
          <Heading style={styles.heading}>Sign up to continue!</Heading>
          <VStack space={3} mt="5">
            <FormControl isInvalid={'name' in errors}>
              <FormControl.Label>
                <Text style={styles.textColor}>Email</Text>
              </FormControl.Label>
              <Input
                backgroundColor="#FEF6ED"
                placeholder="enter valid email"
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
            <FormControl isInvalid={'name' in errors}>
              <FormControl.Label>
                <Text style={styles.textColor}>Username</Text>
              </FormControl.Label>
              <Input
                backgroundColor="#FEF6ED"
                placeholder="username can't be changed"
                onChangeText={value => setUsername({...username, name: value})}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>
                <Text style={styles.textColor}>Password</Text>
              </FormControl.Label>
              <Input
                backgroundColor="#FEF6ED"
                type="password"
                placeholder="enter password"
                onChangeText={value => setPassword({...password, name: value})}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>
                <Text style={styles.textColor}>Confirm Password</Text>
              </FormControl.Label>
              <Input
                backgroundColor="#FEF6ED"
                type="password"
                placeholder="repeat password"
                onChangeText={value =>
                  setPasswordRepeat({...passwordRepeat, name: value})
                }
              />
            </FormControl>
            <Button mt="2" style={styles.loginButton} onPress={createUser}>
              <Text style={styles.loginButtonText}>Register</Text>
            </Button>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}
