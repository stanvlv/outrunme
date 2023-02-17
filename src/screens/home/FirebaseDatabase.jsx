import { NativeBaseProvider, Box, Button } from 'native-base'
import React, {Component, useState, useEffect} from 'react'
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useContext } from 'react';
import { AppStateContext } from '../../../App';

export default function FirebaseDatabase() {
  
    const { user } = useContext(AppStateContext)
    console.log(user.uid)

    const [userData, setUserData] = useState()
    useEffect(() => {
        const userRef = firestore().collection('users').doc(user.uid)

        userRef.get()
        .then(doc => {
            if(doc.exists) {
                setUserData(doc.data())
            } else {
                console.log('Nothing found')
            }
        })
        .catch(err => console.log(err))
    }, [user.uid])

 
// logout the user
const logout = () => {
    auth()
    .signOut()
    .then(() => console.log('User signed out!'));
  }


    return (
        <NativeBaseProvider>
            <Box>Name: {userData?.username}</Box>
        <Button onPress={logout}>Logout</Button>
      </NativeBaseProvider>
    )
}