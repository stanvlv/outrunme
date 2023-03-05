import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  HStack,
  VStack,
  Box,
} from 'native-base';

import {Text} from 'react-native';
import { styles } from '../styles/Style';


import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useContext} from 'react';
import {AppStateContext} from '../../App';

export default function LeaderboardItem({
  wins,
  losses,
  runs,
  username,
  points,
  index,
  streak,
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
    <VStack
      space={3}
      key="rank"
      py="3"
      px="4"
      style={[
        index % 2 === 0
          ? {backgroundColor: '#F0F0F080'}
          : {backgroundColor: '#FFFFFF80'},
        username === userData?.username ? styles.userBorderLeaderboardItem : '',
      ]}>
      <HStack>
        <VStack flex={3}>
          <HStack>
            <Box style={styles.rankBoxLeaderboardItem} justifyContent="center">
              <Text style={styles.rankTextLeaderboardItem}>{index}.</Text>
            </Box>
            <HStack>
              <Text style={styles.pointsLeaderboardItem}>{username}</Text>
              {streak >= 3 ? (
                <HStack>
                  <MaterialIcons name="fire" size={25} color="#F1600D" />
                  <Box ml="-1">
                    <Text style={styles.colorOrangeLeaderboardItem}>{streak}</Text>
                  </Box>
                </HStack>
              ) : null}
            </HStack>
          </HStack>
        </VStack>
        <VStack flex={3}>
          <HStack justifyContent="center" space={0.5}>
            <VStack flex={1}>
              <HStack justifyContent="flex-end">
                <Text style={styles.statsLeaderboardItem}>{wins}</Text>
              </HStack>
            </VStack>
            <VStack flex={1}>
              <HStack justifyContent="center">
                <Text style={styles.statsLeaderboardItem}>{losses}</Text>
              </HStack>
            </VStack>
            <VStack flex={1}>
              <Text style={styles.statsLeaderboardItem}>{runs}</Text>
            </VStack>
          </HStack>
        </VStack>
        <VStack flex={1}>
          <HStack justifyContent="center">
            <Text style={styles.pointsLeaderboardItem}>{points}</Text>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );

}

