import {NativeBaseProvider, Button, View, Text} from 'native-base';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useContext} from 'react';
import {AppStateContext} from '../../../App';
import ProfileItem from '../../components/ProfileItem';
import {styles} from '../../styles/Style';
import {ActivityIndicator} from 'react-native';

export default function FirebaseDatabase() {
  const {user} = useContext(AppStateContext);

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

  // logout the user
  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <NativeBaseProvider>
      {userData ? (
        <View style={styles.screenColor}>
          <ProfileItem
            username={userData?.username}
            runs={userData?.runs}
            challenges_won={userData?.challenges_won}
            challenges_lost={userData?.challenges_lost}
          />
          <View style={{alignItems: 'center', marginBottom: 20}}>
            <Button colorScheme="warning" onPress={logout}>
              <Text style={styles.buttonText}>Logout</Text>
            </Button>
          </View>
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
