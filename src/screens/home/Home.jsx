import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {NativeBaseProvider, Button, Flex, Link} from 'native-base';
import ChallengeItem from '../../components/ChallengeItem';
import firestore from '@react-native-firebase/firestore';
import {AppStateContext} from '../../../App';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Fetch Data

export default function Home({navigation}) {
  const [challenged, setChallenged] = useState([]);
  const [challenger, setChallenger] = useState([]);
  const [selectedTab, setSelectedTab] = useState(1);

  const {user} = useContext(AppStateContext);
  // console.log(user.uid + 'this comes from the profile component');
  // console.log(user);

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

  // console.log(userData);

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
  console.log(challenged);
  const isChallengerDocument = async () => {
    const isChallenger = firestore()
      .collection('challenger')
      .doc(`${userData}`)
      .collection('challenges')

      .onSnapshot(post => {
        const data = post.docs.map(doc => ({id: doc.id, ...doc.data()}));
        setChallenger(data);
      });
    return () => user();
  };
  useEffect(() => {
    isChallengerDocument();
  }, [userData]);

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
              .map((item) => (
                <ChallengeItem
                  key={item.category_name}
                  item={item}
                  title={'you challenged'}
                  userTime={item.challenger_time}
                  userKm={item.challenger_km}
                  nameTile={item.challenged}
                  userData={userData}
                />
              ))}
            <Link
              alignSelf="flex-end"
              my="5"
              onPress={() => navigation.navigate('FindUser')}>
              <Ionicons name="add-circle" size={40} style={{color: 'green'}} />
            </Link>
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
                  otherTime={
                    item.byTime === true ? item.challenger_time : '***'
                  }
                  otherKm={item.byTime === false ? item.challenger_km : '***'}
                  showButtons={true}
                  navigation={navigation}
                  nameTile={item.challenger}
                  userData={userData}
                />
              ))}
          </ScrollView>
        )}
        {selectedTab === 'finished' && (
          <ScrollView>
            {challenged
              .concat(challenger)
              .filter(character => character.finished === true)
              .map((item) => (
                <ChallengeItem
                  key={item.category_name}
                  userData={userData}
                  item={item}
                  title={
                    item.challenger
                      ? 'you were challenged by'
                      : 'you challenged'
                  }
                  userTime={
                    item.challenger
                      ? item.challenged_time
                      : item.challenger_time
                  }
                  userKm={
                    item.challenger ? item.challenged_km : item.challenger_km
                  }
                  otherTime={
                    item.challenger
                      ? item.challenger_time
                      : item.challenged_time
                  }
                  otherKm={
                    item.challenger ? item.challenger_km : item.challenged_km
                  }
                  nameTile={item.challenger ? item.challenger : item.challenged}
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
