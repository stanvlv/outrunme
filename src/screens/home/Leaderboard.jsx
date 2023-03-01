import React, {useState, useEffect, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Box, HStack, NativeBaseProvider, Text} from 'native-base';
import {View, ScrollView} from 'react-native';
import {styles} from '../../styles/Style';
import LeaderboardItem from '../../components/LeaderboardItem';

export default function Leaderboard() {
  const [leaderBoardUser, setLeaderBoardUser] = useState();

  // Get onSnapshot user data from DB, ordered by challenges won:

  const Leaderboard = async () => {
    const Userstats = firestore()
      .collection('users')
      .orderBy('challenges_won', 'desc')
      .onSnapshot(post => {
        const data = post.docs.map(doc => ({id: doc.id, ...doc.data()}));
        setLeaderBoardUser(data);
      });
    return () => user();
  };
  useEffect(() => {
    Leaderboard();
  }, []);

  return (
    <NativeBaseProvider>
      {leaderBoardUser ? (
        <View style={styles.screenColor}>
          <HStack justifyContent="flex-end" px="3">
            <Text px="2">wins </Text>
            <Text px="2">loses </Text>
            <Text px="2">runs</Text>
          </HStack>
          <ScrollView>
            {leaderBoardUser?.map((user, index, key) => (
              <LeaderboardItem
                place={index + 1}
                wins={user.challenges_won}
                loses={user.challenges_lost}
                runs={user.runs}
                username={user.username}
                key={user.uid}
              />
            ))}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.screenColor}>
          <Text>Loading leaderboard data...</Text>
        </View>
      )}
    </NativeBaseProvider>
  );
}
