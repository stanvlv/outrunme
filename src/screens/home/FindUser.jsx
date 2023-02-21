import React, {useState, useEffect, useContext} from 'react';
import ProfileItem from '../../components/ProfileItem';
import firestore from '@react-native-firebase/firestore';
import {VStack, Input, NativeBaseProvider} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function FindUser({navigation}) {
  const [input, setInput] = useState();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const userRef = firestore().collection('users');

    userRef

      .where('username', '==', `${input}`)
      .get()
      .then(collectionSnapshot => {
        collectionSnapshot.forEach(documentSnapshot => {
          setUserData(documentSnapshot.data());
        });
      });
  }, [input]);

  return (
    <NativeBaseProvider>
      <VStack w="100%" space={5} alignSelf="center">
        {/* <Heading fontSize="lg">Material</Heading> */}
        <Input
          placeholder="Find someone to challenge"
          width="100%"
          borderRadius="4"
          py="3"
          px="1"
          fontSize="14"
          InputLeftElement={<Ionicons name="search" size={20} />}
          onChangeText={value => setInput(value)}
        />
      </VStack>
      <ProfileItem
        username={userData.username}
        runs={userData.runs}
        challenges_won={userData.challenges_won}
        challenges_lost={userData.challenges_lost}
      />
    </NativeBaseProvider>
  );
}
