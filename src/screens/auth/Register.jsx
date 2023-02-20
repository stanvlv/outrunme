import React, {useState, useEffect} from 'react';
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

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

export default function Register({ navigation }) {

  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordRepeat, setPasswordRepeat] = React.useState('');
  const [errors, setErrors] = React.useState({});

console.log(password.name)
console.log(passwordRepeat.name)
  // create user with email and password
  const createUser = () => {

    console.log(password.name + " from createUser")
console.log(passwordRepeat.name + " from createUser")
    if (password.name !== passwordRepeat.name) {
      console.log(`Passwords don't match`)
      return
    } 
    auth()
      .createUserWithEmailAndPassword(`${email.name}`, `${password}`)
      .then((userCredential) => {
        console.log('User account created & signed in!');
        
    // take the uid from the reg and get the users collection to make first post
        const { uid } = userCredential.user;
        const userRef = firestore().collection('users').doc(uid);
  

    // if username exist somewhere in the collection it shows an error
        userRef.get().then((doc) => {
          if (doc.exists) {
            return console.log('Username already exists!');
            
          }
  
          userRef.set({
            username: username.name,
            challenges_won: 0,
            challenges_lost: 0,
            runs: 0
          })
          .then(() => {
            console.log('User data added to Firestore!');
            // Navigate to the next screen or do something else here
          })
          .catch((error) => {
            console.error('Error adding user data to Firestore: ', error);
          });
        });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        else if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });
  }




  
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
            fontWeight="semibold">
            Welcome
          </Heading>
          <Heading
            mt="1"
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}
            fontWeight="medium"
            size="xs">
            Sign up to continue!
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
            <FormControl isInvalid={'name' in errors}>
              <FormControl.Label>Username</FormControl.Label>
              <Input
                onChangeText={value => setUsername({...username, name: value})}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                onChangeText={value => setPassword({...password, name: value})}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input
                type="password"
                onChangeText={value => setPasswordRepeat({...passwordRepeat, name: value})}
              />
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={createUser}>
              Register
            </Button>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}
