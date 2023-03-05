import React, {useState, useEffect, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import {HStack, NativeBaseProvider, Text} from 'native-base';
import {View, ScrollView, ActivityIndicator} from 'react-native';
import {styles} from '../../styles/Style';
import LeaderboardItem from '../../components/LeaderboardItem';

export default function Leaderboard({navigation}) {
  const [leaderBoardUser, setLeaderBoardUser] = useState();

  // Get onSnapshot user data from DB, ordered by challenges won:

  const leaderboard = async () => {
    firestore()
      .collection('users')
      .orderBy('points', 'desc')
      // .orderBy('challenges_won', 'desc')
      .onSnapshot(post => {
        const data = post.docs.map(doc => ({id: doc.id, ...doc.data()}));
        setLeaderBoardUser(data);
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
        <View style={styles.screenColor}>
          <HStack
            justifyContent="space-between"
            px="2"
            backgroundColor="#F1600D">
            <Text marginLeft="2" fontWeight="bold" color="#FEF6ED">
              RANK
            </Text>
            <HStack>
              <Text px="3" fontWeight="bold" color="#FEF6ED">
                WINS
              </Text>
              <Text px="3" fontWeight="bold" color="#FEF6ED">
                LOSSES
              </Text>
              <Text px="2" fontWeight="bold" color="#FEF6ED">
                RUNS
              </Text>
            </HStack>
          </HStack>
          <ScrollView>
            {leaderBoardUser?.map((user, index, key) => (
              <LeaderboardItem
                index={index + 1}
                rank={user.rank}
                wins={user.challenges_won}
                losses={user.challenges_lost}
                runs={user.runs}
                username={user.username}
                points={user.points}
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
