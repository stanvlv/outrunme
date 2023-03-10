import React, {useState, useEffect} from 'react';
import ProfileItem from '../../components/ProfileItem';
import firestore from '@react-native-firebase/firestore';
import {
  VStack,
  Input,
  NativeBaseProvider,
  Button,
  Text,
  View,
  HStack,
  ScrollView,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useContext} from 'react';
import {AppStateContext} from '../../../App';
import {styles} from '../../styles/Style';

export default function Search({navigation}) {
  const [input, setInput] = useState('');
  const [secondUser, setSecondUser] = useState({});

  const {user, setRun} = useContext(AppStateContext);

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
      challenged_fcmToken: secondUser.fcmToken,
    });

    setSecondUser({});
    setInput('');
    navigation.navigate('Map');
  };

  // searching for user by username in the database from the input field
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
          <ScrollView>
            <ProfileItem
              username={secondUser.username}
              runs={secondUser.runs}
              challenges_won={secondUser.challenges_won}
              challenges_lost={secondUser.challenges_lost}
              totalKm={secondUser.totalKm}
              totalTime={secondUser.totalTime}
            />
            <HStack alignSelf="center" my="5">
              {/* style={styles.challengeButton} */}
              <Button onPress={onClick} colorScheme="warning">
                <Text style={styles.buttonText}>Challenge</Text>
              </Button>
            </HStack>
          </ScrollView>
        )}
      </View>
    </NativeBaseProvider>
  );
}
