import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {NativeBaseProvider, Button, Flex, Spacer} from 'native-base';
import ChallengeItem from '../../components/ChallengeItem';
import firestore from '@react-native-firebase/firestore';
import { AppStateContext } from '../../../App';

// Fetch Data

export default function Home({navigation}) {
  const [challenged, setChallenged] = useState([]);
  const [challenger, setChallenger] = useState([]);
  const [selectedTab, setSelectedTab] = useState(1);


  const { user } = useContext(AppStateContext)
    console.log(user.uid + 'this comes from the profile component')
    console.log(user)

    const [userData, setUserData] = useState()
    useEffect(() => {
        const userRef = firestore().collection('users').doc(user.uid)

        userRef.get()
        .then(doc => {
            if(doc.exists) {
                setUserData(doc.data().username)
            } else {
                console.log('Nothing found')
            }
        })
        .catch(err => console.log(err))
    }, [user.uid])

        console.log(userData)

  const isChallengedDocument = async () => {
    const isChallenged = firestore()
      .collection('challenges')
      .where('challenged', '==', `${userData}`)
      .onSnapshot(post => {
        const data = post.docs.map(doc => ({id: doc.id, ...doc.data()}));
        setChallenged(data);
      });
    return () => user();
  };
  useEffect(() => {
    isChallengedDocument();
  }, [userData]);
  // console.log(challenged);

  const isChallengerDocument = async () => {
    const isChallenger = firestore()
      .collection('challenges')
      .where('challenger', '==', `${userData}`)
      // .orderBy('challenger_time')
      .onSnapshot(post => {
        const data = post.docs.map(doc => ({id: doc.id, ...doc.data()}));
        setChallenger(data);
      });
    return () => user();
  };
  useEffect(() => {
    isChallengerDocument();
  }, [userData]);
  // console.log(challenger);

  const onPressSent = () => setSelectedTab('sent');

  const onPressReceived = () => setSelectedTab('received');
  const onPressFinished = () => setSelectedTab('finished');

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', padding: 10}}>
          <Text style={styles.titleText}>My Challenges</Text>
        </View>
        <Flex direction="row">
          <Button
            style={{flex: 1}}
            borderRadius="full"
            colorScheme={selectedTab === 'sent' ? 'success' : 'warning'}
            onPress={onPressSent}>
            Sent
          </Button>
          <Button
            style={{flex: 1}}
            borderRadius="full"
            colorScheme={selectedTab === 'received' ? 'success' : 'warning'}
            onPress={onPressReceived}>
            Received
          </Button>
          <Button
            style={{flex: 1}}
            borderRadius="full"
            colorScheme={selectedTab === 'finished' ? 'success' : 'warning'}
            onPress={onPressFinished}>
            Finished
          </Button>
        </Flex>
        {selectedTab === 'sent' && (
          <ScrollView>
            {challenger
              .filter(character => !character.finished)
              .map((item, key) => (
                <ChallengeItem
                  key={item.category_name}
                  item={item}
                  title={'you challenged'}
                  userTime={item.challenger_time}
                  userKm={item.challenger_km}
                />
              ))}
          </ScrollView>
        )}
        {selectedTab === 'received' && (
          <ScrollView>
            {challenged
              .filter(character => !character.finished)
              .map((item, key) => (
                <ChallengeItem
                  key={item.category_name}
                  item={item}
                  title={'you were challenged by'}
                  otherTime={item.challenger_time}
                  otherKm={item.challenger_km}
                />
              ))}
          </ScrollView>
        )}
        {selectedTab === 'finished' && (
          <ScrollView>
            {challenged
              .concat(challenger)
              .filter(character => character.finished === true)
              .map((item, key) => (
                <ChallengeItem
                  key={item.category_name}
                  item={item}
                  title={
                    item.challenger === 'User1'
                      ? 'you challenged'
                      : 'you were challenged by'
                  }
                  userTime={
                    item.challenger === 'User1'
                      ? item.challenger_time
                      : item.challenged_time
                  }
                  userKm={
                    item.challenger === 'User1'
                      ? item.challenger_km
                      : item.challenged_km
                  }
                  otherTime={
                    item.challenger === 'User1'
                      ? item.challenged_time
                      : item.challenger_time
                  }
                  otherKm={
                    item.challenger === 'User1'
                      ? item.challenged_km
                      : item.challenger_km
                  }
                />
              ))}
          </ScrollView>
        )}
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
});
