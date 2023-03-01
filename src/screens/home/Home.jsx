import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {NativeBaseProvider, Button, Flex, Link} from 'native-base';
import ChallengeItem from '../../components/ChallengeItem';
import firestore from '@react-native-firebase/firestore';
import {AppStateContext} from '../../../App';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Fetch Data

export default function Home({navigation}) {
  const [challenged, setChallenged] = useState([]);
  const [challenger, setChallenger] = useState([]);
  const [selectedTab, setSelectedTab] = useState('received');

  const {user, run} = useContext(AppStateContext);
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
  // console.log(challenged);
  const isChallengerDocument = async () => {
    const isChallenger = firestore()
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
    }
  }, [run]);

  const onPressSent = () => setSelectedTab('sent');
  const onPressReceived = () => setSelectedTab('received');
  const onPressFinished = () => setSelectedTab('finished');

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', padding: 4}}></View>
        <View style={styles.topNavigation}>
          <TouchableOpacity
            onPress={onPressSent}
            style={selectedTab === 'sent' ? styles.activeTab : styles.tab}>
            <Text
              style={
                selectedTab === 'sent' ? styles.activeText : styles.textTab
              }>
              Sent
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressReceived}
            style={selectedTab === 'received' ? styles.activeTab : styles.tab}>
            <Text
              style={
                selectedTab === 'received' ? styles.activeText : styles.textTab
              }>
              Received
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressFinished}
            style={selectedTab === 'finished' ? styles.activeTab : styles.tab}>
            <Text
              style={
                selectedTab === 'finished' ? styles.activeText : styles.textTab
              }>
              Finished
            </Text>
          </TouchableOpacity>
        </View>
        {selectedTab === 'sent' && (
          <ScrollView>
            {challenger
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
              ))}
          </ScrollView>
        )}
        {selectedTab === 'sent' && (
          <Link
            style={styles.plusIcon}
            alignSelf="flex-end"
            my="5"
            onPress={() => navigation.navigate('FindUser')}>
            <Ionicons name="add-circle" size={70} style={{color: '#F1600D'}} />
          </Link>
        )}
        {selectedTab === 'received' && (
          <ScrollView>
            {challenged
              .filter(character => !character.finished)
              .map((item, key) => (
                <ChallengeItem
                  key={item.category_name}
                  item={item}
                  title={'Challenged by'}
                  otherTime={
                    item.byTime === true ? item.challenger_time : '***'
                  }
                  otherKm={item.byTime === false ? item.challenger_km : '***'}
                  selectedTab={'received'}
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
              .map(item => (
                <ChallengeItem
                  key={item.category_name}
                  userData={userData}
                  winColor={item.winner ? '#2CD034' : "#D0342C"}
                  winner={item.winner}
                  item={item}
                  title={
                    item.challenger
                      ? 'challenged by'
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
                  sent={item.challenger ? true : false}
                  selectedTab={'finished'}
                  winner={item.winner}
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
    backgroundColor: '#FEF6ED',
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
  activeButton: {
    color: '#007aff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inactiveButton: {
    colorScheme: 'red',
  },
  topNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEF6ED',
    borderWidth: 1,
    borderColor: '#FEF6ED',
    borderRadius: 5,
    overflow: 'hidden',
    paddingBottom: 15,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  activeTab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#F1600D',
  },
  activeText: {
    color: '#F1600D',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textTab: {
    color: '#50A5B1',
    fontSize: 16,
    fontWeight: 'bold',
  },

  plusIcon: {
    position: 'absolute',
    left: '50%',
    transform: [{translateX: -32}],
    bottom: 0,
  },
});
