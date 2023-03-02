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
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useContext} from 'react';
import {AppStateContext} from '../../App';
import {color} from 'native-base/lib/typescript/theme/styled-system';

export default function LeaderboardItem({
  place,
  wins,
  losses,
  runs,
  username,
  navigation
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
        key='place'
        alignItems="center"
        py="3"
        px="2"
        w="98%"
        justifyContent="space-between"
        style={[
          place % 2 === 0 ? { backgroundColor: '#F0F0F080' } : { backgroundColor: '#FFFFFF80' },
          username === userData?.username ? styles.userBorder : '',
        ]}
        
        >
          {/* <TouchableOpacity onPress={() => navigation.navigate('Profile')}> */}
        <HStack style={{direction: 'row', alignItems: 'baseline'}} >
          <Text fontSize="md">{place}. </Text>
            <Text fontSize="lg" bold>
        {username}
          </Text>
        </HStack>
        {/* </TouchableOpacity> */}
        <HStack mx="1">
          <HStack mx="5" width='25'>
            <Ionicons name="trophy" size={23} color='#028a0f' />
            <Text fontSize="md">{wins}</Text>
          </HStack>
          <HStack mx="4" width='25'>
            <Ionicons name="close" size={23} color="#df2c14" />
            <Text fontSize="md">{losses}</Text>
          </HStack>
          <HStack mx="4" width='25'>
            <MaterialIcons name="run" size={23} color="#F1600D" />
            <Text fontSize="md">{runs}</Text>
          </HStack>
        </HStack>
     
      </HStack> 
        
    </Center>
  );
}

const styles = StyleSheet.create({
  userBorder: {
    backgroundColor: '#50A5B180',
    color: 'white',
  },
});
