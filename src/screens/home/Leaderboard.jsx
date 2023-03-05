import React, {useState, useEffect, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Box, HStack, NativeBaseProvider, VStack} from 'native-base';
import {View, ScrollView, ActivityIndicator, Text} from 'react-native';
import {HStack, NativeBaseProvider, Text} from 'native-base';
import {View, ScrollView, ActivityIndicator} from 'react-native';
import {styles} from '../../styles/Style';
import LeaderboardItem from '../../components/LeaderboardItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Leaderboard({navigation}) {
  const [leaderBoardUser, setLeaderBoardUser] = useState();

  // Get onSnapshot user data from DB, ordered by challenges won:

  const leaderboard = async () => {
    firestore()
      .collection('users')
      // .orderBy('points', 'desc')
      // .orderBy('challenges_won', 'desc')
      .onSnapshot(post => {
        const data = post.docs.map(doc => ({id: doc.id, ...doc.data()}));
        const sorted = data.sort(
          (a, b) =>
            b.points - a.points ||
            b.challenges_won - a.challenges_won ||
            b.runs - a.runs,
        );
        setLeaderBoardUser(sorted);
      });
  };
  useEffect(() => {
    leaderboard();
  }, []);

  function setRanks(leaderBoardUser) {
    let currentCount = -1,
      currentRank = 0,
      stack = 1; // consecutive clients with same rating
    for (let i = 0; i < leaderBoardUser?.length; i++) {
      const result = leaderBoardUser[i];
      if (currentCount !== result['points']) {
        currentRank += stack;
        stack = 1;
      } else {
        stack++;
      }
      result['rank'] = currentRank;
      currentCount = result['points'];
    }
  }
  setRanks(leaderBoardUser);
  console.log(leaderBoardUser);

  return (
    <NativeBaseProvider>
      {leaderBoardUser ? (
        <View style={styles.screenColor} opacity={0.8}>
          <HStack
            justifyContent="space-between"
            px="4"
            py="1"
            backgroundColor="#F1600D">
            <VStack flex={3}>
              <HStack space={3} alignItems="center">
                <Text style={styles.HeaderText}>#</Text>
                <Text style={styles.HeaderText}>username</Text>
              </HStack>
            </VStack>
            <VStack flex={3}>
              <HStack space={4} alignItems="center" justifyContent="center">
                <Ionicons name="trophy" size={20} color="#FEF6ED" />
                <Ionicons name="close" size={25} color="#FEF6ED" />
                <MaterialIcons name="run" size={20} color="#FEF6ED" />
              </HStack>
            </VStack>
            <VStack flex={1}>
              <HStack justifyContent="center">
                <MaterialIcons name="star" size={30} color="#FEF6ED" />
              </HStack>
            </VStack>
          </HStack>
          <ScrollView>
            {leaderBoardUser?.map((user, index, key) => (
              <LeaderboardItem
                index={index + 1}
                wins={user.challenges_won}
                losses={user.challenges_lost}
                runs={user.runs}
                username={user.username}
                points={user.points}
                streak={user.streak}
              />
            ))}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.screenColor}>
          <ActivityIndicator
            size="large"
            color="#F1600D"
            style={{paddingTop: 150}}
          />
        </View>
      )}
    </NativeBaseProvider>
  );
}
