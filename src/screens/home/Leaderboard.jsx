import React, {useState, useEffect, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Box, HStack, NativeBaseProvider, Text} from 'native-base';
import {View, ScrollView, ActivityIndicator} from 'react-native';
import {styles} from '../../styles/Style';
import LeaderboardItem from '../../components/LeaderboardItem';

export default function Leaderboard({navigation}) {
  const [leaderBoardUser, setLeaderBoardUser] = useState();

  // Get onSnapshot user data from DB, ordered by challenges won:

  const leaderboard = async () => {
   // const userstats = it seems this line is not needed
    firestore()
      .collection('users')
      .orderBy('challenges_won', 'desc')
      .onSnapshot(post => {
        const data = post.docs.map(doc => ({id: doc.id, ...doc.data()}));
        setLeaderBoardUser(data);
      });
   // return () => user(); this line is not needed it seems
  };
  useEffect(() => {
    leaderboard();
  
  }, []);


    
  return (
    <NativeBaseProvider>
      {leaderBoardUser ? ( <View style={styles.screenColor}>
       
        <HStack justifyContent="space-between" px="2" backgroundColor="#F1600D">
  <Text marginLeft="2" fontWeight='bold' color='#FEF6ED'>RANK</Text>  
  <HStack>
    <Text px="3" fontWeight='bold' color='#FEF6ED'>WINS</Text>
    <Text px="3" fontWeight='bold' color='#FEF6ED'>LOSSES</Text>
    <Text px="2" fontWeight='bold' color='#FEF6ED'>RUNS</Text>
  </HStack>
</HStack>
        <ScrollView>
          {leaderBoardUser?.map((user, index, key) => (
            <LeaderboardItem
              place={index + 1}
              wins={user.challenges_won}
              losses={user.challenges_lost}
              runs={user.runs}
              username={user.username}
            />
          ))}
        </ScrollView>
      </View>) : (
        <View  style={styles.screenColor} >
        <ActivityIndicator size="large" color="#F1600D" style={{paddingTop: 150}} />
       </View>
      )}
     
    </NativeBaseProvider>
  );
}
