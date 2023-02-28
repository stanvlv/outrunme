import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  VStack,
  Input,
  NativeBaseProvider,
  Button,
  Link,
  Box,
  HStack,
  Center,
  Text,
} from 'native-base';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useContext} from 'react';
import {AppStateContext} from '../../App';
import {color} from 'native-base/lib/typescript/theme/styled-system';

export default function LeaderboardItem({
  place,
  wins,
  loses,
  runs,
  username,
  key,
}) {
  const {user} = useContext(AppStateContext);
  const [userData, setUserData] = useState();
  useEffect(() => {
    const userRef = firestore().collection('users').doc(user.uid);

    userRef
      .get()
      .then(doc => {
        if (doc.exists) {
          setUserData(doc.data());
        } else {
          console.log('Nothing found');
        }
      })
      .catch(err => console.log(err));
  }, [user.uid]);

  return (
    <Center>
      <HStack
        key={key}
        alignItems="center"
        py="3"
        px="2"
        w="98%"
        justifyContent="space-between"
        style={username === userData?.username ? styles.userBorder : ''}>
        <HStack alignItems="center">
          <Text fontSize="md">{place}. </Text>
          <Text fontSize="lg" bold>
            {username}
          </Text>
        </HStack>
        <HStack>
          <HStack mx="2">
            <Ionicons name="trophy" size={23} />
            <Text fontSize="md">{wins}</Text>
          </HStack>
          <HStack mx="2">
            <Ionicons name="close-circle" size={23} />
            <Text fontSize="md">{loses}</Text>
          </HStack>
          <HStack mx="2">
            <Ionicons name="walk" size={23} />
            <Text fontSize="md">{runs}</Text>
          </HStack>
        </HStack>
      </HStack>
    </Center>
  );
}

const styles = StyleSheet.create({
  userBorder: {
    borderRadius: 20,
    backgroundColor: '#F1600D',
    color: 'white',
  },
});
