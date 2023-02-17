import { NativeBaseProvider, Box } from 'native-base'
import React, {Component, useState, useEffect} from 'react'
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export default function FirebaseDatabase({ navigation }) {
   
   const [userr, setUserr] = useState()
        const userDocument = async () => {
       
            const user = await firestore().collection('users').doc('N5EmkSNHUyimvKqrtpWH').get();
             return user
         }
         useEffect(() => {
            userDocument().then(user => {
                if(user && user.data) {
                    setUserr(user.data())
                }
                
            })
    }, [])
     
    console.log(userr)
    
    return (
        <NativeBaseProvider>
            <Box>firebase database</Box>
            <Box>Name: {userr?.username} </Box>
        </NativeBaseProvider>
    )
}