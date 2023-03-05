import React, {useState, useEffect} from 'react';
import ProfileItem from '../../components/ProfileItem';
import firestore from '@react-native-firebase/firestore';
import {
  VStack,
  Input,
  NativeBaseProvider,
  Button,
  Link,
  Text,
  View,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useContext} from 'react';
import {AppStateContext} from '../../../App';
import {styles} from '../../styles/Style';

export default function Search({navigation}) {
  const [input, setInput] = useState('');
  const [secondUser, setSecondUser] = useState({});

  const {user, isChallenged, run, setRun} = useContext(AppStateContext);

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

  const onClick = () => {
    setRun({
      challenger: userData.username,
      challenged: secondUser.username,
    });

    setSecondUser({});
    setInput('');
    navigation.navigate('Map');
  };

  // searching for a suer by username in the database from the input field
  useEffect(() => {
    const userRef = firestore().collection('users');

    userRef

      .where('username', '==', `${input}`)
      .get()
      .then(collectionSnapshot => {
        collectionSnapshot.forEach(documentSnapshot => {
          setSecondUser(documentSnapshot.data());
        });
      });
  }, [input]);

  return (
    <NativeBaseProvider>
      <View style={styles.screenColor}>
        <VStack w="100%" space={5} alignSelf="center">
          {/* <Heading fontSize="lg">Material</Heading> */}
          <Input
            placeholder="Find someone to challenge"
            width="100%"
            borderRadius="4"
            py="3"
            px="1"
            fontSize="14"
            InputLeftElement={<Ionicons name="search" size={20} />}
            value={input}
            onChangeText={value => setInput(value)}
          />
        </VStack>
        {secondUser.username && (
          <ProfileItem
            username={secondUser.username}
            runs={secondUser.runs}
            challenges_won={secondUser.challenges_won}
            challenges_lost={secondUser.challenges_lost}
          />
        )}
        {secondUser.username && (
          <View alignSelf="center" my="5">
            {/* style={styles.challengeButton} */}
            <Button onPress={onClick} colorScheme="warning">
              <Text style={styles.buttonText}>Challenge</Text>
            </Button>
          </View>
        )}
      </View>
    </NativeBaseProvider>
  );
}
