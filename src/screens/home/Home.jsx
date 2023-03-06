import React, {useState, useEffect, useContext} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {styles} from '../../styles/Style';
import {NativeBaseProvider, Button, HStack, VStack} from 'native-base';
import ChallengeItem from '../../components/ChallengeItem';
import firestore from '@react-native-firebase/firestore';
import {AppStateContext} from '../../../App';
import FinishedChallenges from '../../components/FinishedChallenges';

// Fetch Data

export default function Home({navigation}) {
  const [challenged, setChallenged] = useState([]);
  const [challenger, setChallenger] = useState([]);
  const [selectedTab, setSelectedTab] = useState('received');

  const {user, run} = useContext(AppStateContext);

  const [userData, setUserData] = useState();
  useEffect(() => {
    const userRef = firestore().collection('users').doc(user.uid);

    userRef
      .get()
      .then(doc => {
        if (doc.exists) {
          setUserData(doc.data().username);
        } else {
          console.log('Nothing found');
        }
      })
      .catch(err => console.log(err));
  }, [user.uid]);

  const isChallengedDocument = async () => {
    const isChallenged = firestore()
      .collection('challenged')
      .doc(`${userData}`)
      .collection('challenges')
      .orderBy('challenger_date', 'desc')
      .onSnapshot(post => {
        const data = post.docs.map(doc => ({id: doc.id, ...doc.data()}));
        setChallenged(data);
      });
    return () => user();
  };

  useEffect(() => {
    isChallengedDocument();
  }, [userData]);

  const isChallengerDocument = async () => {
    firestore()
      .collection('challenger')
      .doc(`${userData}`)
      .collection('challenges')
      .orderBy('challenger_date', 'desc')
      .onSnapshot(post => {
        const data = post.docs.map(doc => ({id: doc.id, ...doc.data()}));
        setChallenger(data);
      });
    return () => user();
  };

  useEffect(() => {
    isChallengerDocument();
  }, [userData]);

  useEffect(() => {
    if (run?.finished === true) {
      setSelectedTab('finished');
    } else if (run?.sent === true) {
      setSelectedTab('sent');
    }
  }, [run]);

  const onPressSent = () => setSelectedTab('sent');
  const onPressReceived = () => setSelectedTab('received');
  const onPressFinished = () => setSelectedTab('finished');

  return (
    <NativeBaseProvider>
      <View style={styles.containerHome}>
        <View style={{flexDirection: 'row', padding: 4}}></View>
        <View style={styles.topNavigationHome}>
          <TouchableOpacity
            onPress={onPressSent}
            style={
              selectedTab === 'sent' ? styles.activeTabHome : styles.tabHome
            }>
            <Text
              style={
                selectedTab === 'sent'
                  ? styles.activeTextHome
                  : styles.textTabHome
              }>
              Sent
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressReceived}
            style={
              selectedTab === 'received' ? styles.activeTabHome : styles.tabHome
            }>
            <Text
              style={
                selectedTab === 'received'
                  ? styles.activeTextHome
                  : styles.textTabHome
              }>
              Received
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressFinished}
            style={
              selectedTab === 'finished' ? styles.activeTabHome : styles.tabHome
            }>
            <Text
              style={
                selectedTab === 'finished'
                  ? styles.activeTextHome
                  : styles.textTabHome
              }>
              Finished
            </Text>
          </TouchableOpacity>
        </View>
        {selectedTab === 'sent' && (
          <SentView
            challenger={challenger}
            userData={userData}
            navigation={navigation}
          />
        )}
        {selectedTab === 'received' && (
          <ReceivedView
            challenged={challenged}
            userData={userData}
            navigation={navigation}
          />
        )}
        {selectedTab === 'finished' && (
          <ScrollView>
            {challenged
              .concat(challenger)
              .filter(character => character.finished === true)
              .sort(function (a, b) {
                return (
                  new Date(b.challenged_date) - new Date(a.challenged_date)
                );
              })
              .map(item => (
                <FinishedChallenges
                  key={item.category_name}
                  userData={userData}
                  winColor={item.winner ? '#2CD034' : '#D0342C'}
                  winner={item.winner}
                  item={item}
                  title={item.challenger ? 'challenged by' : 'you challenged'}
                  userTime={
                    item.challenger
                      ? item.challenged_time
                      : item.challenger_time
                  }
                  userKm={
                    item.challenger ? item.challenged_km : item.challenger_km
                  }
                  userCoordinates={
                    item.challenger
                      ? item.challenged_coordinates
                      : item.challenger_coordinates
                  }
                  otherTime={
                    item.challenger
                      ? item.challenger_time
                      : item.challenged_time
                  }
                  otherKm={
                    item.challenger ? item.challenger_km : item.challenged_km
                  }
                  opponentCoordinates={
                    item.challenger
                      ? item.challenger_coordinates
                      : item.challenged_coordinates
                  }
                  byTime={item.byTime}
                  nameTile={item.challenger ? item.challenger : item.challenged}
                  sent={item.challenger ? false : true}
                  selectedTab={'finished'}
                  cena={item.challenger}
                />
              ))}
          </ScrollView>
        )}
      </View>
    </NativeBaseProvider>
  );
}

function SentView({challenger, userData, navigation}) {
  const onGoingChallenges = challenger.filter(character => !character.finished);
  return (
    <ScrollView
      contentContainerStyle={
        onGoingChallenges.length
          ? null
          : {flexGrow: 1, justifyContent: 'center'}
      }>
      {onGoingChallenges.length ? (
        challenger
          .filter(character => !character.finished)
          .map(item => (
            <ChallengeItem
              key={item.category_name}
              item={item}
              title={'you challenged'}
              userTime={item.challenger_time}
              userKm={item.challenger_km}
              nameTile={item.challenged}
              userData={userData}
              sent={true}
              selectedTab={'sent'}
              byTime={item.byTime}
            />
          ))
      ) : (
        <View
          py="5"
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <VStack>
            <HStack justifyContent="center">
              <Text style={styles.customTextHome}>
                No pending sent challenges
              </Text>
            </HStack>
            <HStack justifyContent="center" mb="5">
              <Text style={styles.customTextHome}>
                Search for someone to challenge
              </Text>
            </HStack>
          </VStack>
          <Button
            colorScheme="warning"
            onPress={() => {
              navigation.navigate('Search');
            }}>
            Search
          </Button>
        </View>
      )}
    </ScrollView>
  );
}

function ReceivedView({challenged, userData, navigation}) {
  const onGoingChallenges = challenged.filter(character => !character.finished);
  return (
    <ScrollView
      contentContainerStyle={
        onGoingChallenges.length
          ? null
          : {flexGrow: 1, justifyContent: 'center'}
      }>
      {onGoingChallenges.length ? (
        challenged
          .filter(character => !character.finished)
          .map((item, key) => (
            <ChallengeItem
              key={item.category_name}
              item={item}
              title={'Challenged by'}
              otherTime={item.byTime === true ? item.challenger_time : '***'}
              otherKm={item.byTime === false ? item.challenger_km : '***'}
              selectedTab={'received'}
              navigation={navigation}
              nameTile={item.challenger}
              userData={userData}
            />
          ))
      ) : (
        <View
          py="5"
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <VStack>
            <HStack justifyContent="center">
              <Text style={styles.customTextHome}>
                No pending received challenges
              </Text>
            </HStack>
            <HStack justifyContent="center" mb="5">
              <Text style={styles.customTextHome}>
                Search for someone to challenge
              </Text>
            </HStack>
          </VStack>
          <Button
            colorScheme="warning"
            onPress={() => {
              navigation.navigate('Search');
            }}>
            Search
          </Button>
        </View>
      )}
    </ScrollView>
  );
}
