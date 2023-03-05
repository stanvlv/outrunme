import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  HStack,
  Center,
  index,
} from 'native-base';

import { View, TouchableOpacity, Text} from 'react-native';
import { styles } from '../styles/Style';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useContext} from 'react';
import {AppStateContext} from '../../App';

export default function LeaderboardItem({
  rank,
  points,
  wins,
  losses,
  runs,
  username,
  points,
  navigation,
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
      // borderBottomWidth="0.4"
      // borderBottomColor="#F1600D80"
      style={[
        index % 2 === 0
          ? {backgroundColor: '#F0F0F080'}
          : {backgroundColor: '#FFFFFF80'},
        username === userData?.username ? styles.userBorder : '',
      ]}>
      <HStack>
        <VStack flex={3}>
          <HStack>
            <Box style={styles.rankBox} justifyContent="center">
              <Text style={styles.rankText}>{index}.</Text>
            </Box>
            <HStack>
              <Text style={styles.points}>{username}</Text>
              {streak >= 3 ? (
                <HStack>
                  <MaterialIcons name="fire" size={25} color="#F1600D" />
                  <Box ml="-1">
                    <Text style={styles.colorOrange}>{streak}</Text>
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
                <Text style={styles.stats}>{wins}</Text>
              </HStack>
            </VStack>
            <VStack flex={1}>
              <HStack justifyContent="center">
                <Text style={styles.stats}>{losses}</Text>
              </HStack>
            </VStack>
            <VStack flex={1}>
              <Text style={styles.stats}>{runs}</Text>
            </VStack>
          </HStack>
        </VStack>
        <VStack flex={1}>
          <HStack justifyContent="center">
            <Text style={styles.points}>{points}</Text>
          </HStack>
        </VStack>
      </HStack>
      {/*     <HStack mx="1" justifyContent="center">
        <VStack mx="5" justifyContent="center" alignItems="center">
          <Text style={styles.stats}>wins</Text>
          <Text style={styles.stats}>{wins}</Text>
        </VStack>
        <VStack
          style={styles.borderStats}
          px="4"
          justifyContent="center"
          alignItems="center">
          <Text style={styles.stats}>losses</Text>
          <Text style={styles.stats}>{losses}</Text>
        </VStack>
        <VStack mx="4" justifyContent="center" alignItems="center">
          <Text style={styles.stats}>runs</Text>
          <Text style={styles.stats}>{runs}</Text>
        </VStack>
      </HStack> */}
    </VStack>
  );

}

const styles = StyleSheet.create({
  userBorder: {
    backgroundColor: '#50A5B1CC',
    color: 'white',
  },
  rankText: {
    fontSize: 25,
    // color: 'white',
    fontWeight: 'bold',
    paddingRight: 2,
  },
  // rankBox: {
  //   backgroundColor: '#F1600D',
  //   marginRight: 10,
  //   paddingHorizontal: 10,
  //   borderRadius: 100,
  // },

  username: {
    fontSize: 25,
  },
  points: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 'auto',
    color: 'black',
    opacity: 0.6,
    // fontFamily: 'GajrajOne-Regular',
  },
  stats: {
    fontSize: 22,
  },
  borderStats: {
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
  },

  colorOrange: {
    color: '#F1600D',
  },
});
