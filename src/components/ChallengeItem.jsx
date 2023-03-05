import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {
  VStack,
  Input,
  NativeBaseProvider,
  Button,
  Link,
  Box,
  HStack,
  Text,
  Center,
} from 'native-base';
import { styles } from '../styles/Style';
import {useContext} from 'react';
import {AppStateContext} from '../../App';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ChallengeItem({
  item,
  userTime,
  userKm,
  otherTime,
  otherKm,
  nameTile,
  selectedTab,
  navigation,
  userData,
  sent,
  byTime,
  winner,
}) {
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const {setRun, user} = useContext(AppStateContext);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    if (isClicked) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [isClicked]);

  const loseOnePoint = user_id => {
    const userReference = firestore().collection('users').doc(user_id);
    return firestore().runTransaction(async transaction => {
      const postSnapshot = await transaction.get(userReference);
      const updatedPoints = postSnapshot.data().points - 1;
      if (updatedPoints >= 0) {
        await transaction.update(userReference, {points: updatedPoints});
      }
    });
  };

  const PostRejected = () => {
    firestore()
      .collection('challenged')
      .doc(`${userData}`)
      .collection('challenges')
      .doc(`${item.id}`)
      .update({
        accepted: false,
      });
    // Add a lost challenge on user profile
    const increment = firestore.FieldValue.increment(1);
    firestore().collection('users').doc(user.uid).update({
      challenges_lost: increment,
      streak: 0,
    });
    // Take 1 point from user profile
    loseOnePoint(user.uid);
    // Add a win, a point on challenger profile
    firestore().collection('users').doc(item.challenger_id).update({
      challenges_won: increment,
      points: increment,
      runs: increment,
      streak: increment,
    });
  };

  const DeleteSent = () => {
    firestore()
      .collection('challenger')
      .doc(`${userData}`)
      .collection('challenges')
      .doc(`${item.id}`)
      .delete();

    firestore()
      .collection('challenged')
      .doc(`${nameTile}`)
      .collection('challenges')
      .doc(`${item.id}`)
      .delete();
  };

  const onClick = () => {
    setRun({
      showMap: true,
      challenger: nameTile,
      challenged: userData,
      byTime: item.byTime,
      // only to be used when user is the challenged:
      challenger_id: item.challenger_id,
      challenger_time: otherTime,
      challenger_km: otherKm,
      ...item,
    });

    navigation.navigate('Map');
  };

  const date = new Date(item.challenger_date);
  const numb = date.getDay();

  if (numb === 0) {
    weekDay = 'Sun.';
  } else if (numb === 1) {
    weekDay = 'Mon.';
  } else if (numb === 2) {
    weekDay = 'Tue.';
  } else if (numb === 3) {
    weekDay = 'Wed.';
  } else if (numb === 4) {
    weekDay = 'Thu.';
  } else if (numb === 5) {
    weekDay = 'Fri.';
  } else if (numb === 6) {
    weekDay = 'Sat.';
  }

  const convertDateHours = time => {
    const dt = new Date(time);
    const hr = '0' + dt.getHours();
    const m = '0' + dt.getMinutes();
    return hr.slice(-2) + ':' + m.slice(-2);
  };

  const formatTime = timer => {
    const hours = Math.floor(timer / 3600);
    const minutes = Math.floor(timer / 60);
    const remainingSeconds = timer % 60;
    const hoursStr = String(hours).padStart(1, '0');
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(remainingSeconds).padStart(2, '0');
    return `${hoursStr}:${minutesStr}:${secondsStr}`;
  };
  const formatDistance = distance => {
    const km = Math.floor(distance / 1000); // get km
    const hm = Math.floor((distance - km * 1000) / 100); // get hundreds of meters
    const dm = Math.floor((distance - km * 1000 - hm * 100) / 10); // get tenths of meters
    return `${km}.${hm}${dm} km`;
  };
  const finalTime = convertDateHours(item.challenger_date);
  const RunTime = formatTime(otherTime);
  const convUserTime = formatTime(userTime);
  const convUserKm = formatDistance(userKm);
  const convOtherKm = formatDistance(otherKm);

  return (
    <View>
      <TouchableOpacity
        // activeOpacity={0.8}
        onPress={handleClick}
        style={styles.headerChallengeItem}>
        {/* Header */}
        {selectedTab !== 'finished' && (
          <VStack space={5}>
            <HStack justifyContent="space-between">
              <HStack alignItems="center">
                {sent ? (
                  <MaterialCommunityIcons
                    name="sword-cross"
                    size={60}
                    style={winner ? {color: '#50A5B1'} : {color: '#F1600D'}}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="shield-sword"
                    size={60}
                    style={winner ? {color: '#50A5B1'} : {color: '#F1600D'}}
                  />
                )}
                <Text style={styles.headerTextChallengeItem} ml="6" py="2">
                  {nameTile}
                </Text>
              </HStack>

              <Text style={styles.dateChallengeItem}>
                {weekDay} {finalTime}
              </Text>
            </HStack>

            <HStack justifyContent="space-between" alignItems="flex-end">
              {otherKm === '***' && (
                <HStack p="0.5" alignItems="center" style={styles.fillBlueChallengeItem}>
                  <MaterialCommunityIcons
                    name="timer-outline"
                    size={32}
                    style={styles.colorWhiteChallengeItem}
                  />
                  <Text px="1" style={styles.colorWhiteChallengeItem}>
                    {RunTime}
                  </Text>
                </HStack>
              )}
              {otherTime === '***' && (
                <HStack alignItems="center" style={styles.fillBlueChallengeItem} py="0.5">
                  <MaterialCommunityIcons
                    name="map-marker-distance"
                    size={32}
                    style={styles.colorWhiteChallengeItem}
                  />
                  <Text px="1" style={styles.colorWhiteChallengeItem}>
                    {convOtherKm}
                  </Text>
                </HStack>
              )}

              {selectedTab === 'received' && item.accepted !== false && (
                <HStack>
                  <Button mx="5" style={styles.buttonAcceptChallengeItem} onPress={onClick}>
                    <Text style={styles.colorBlueChallengeItem}>Accept</Text>
                  </Button>
                  <Button style={styles.buttonDeclineChallengeItem} onPress={PostRejected}>
                    <Text style={styles.colorOrangeChallengeItem}>Decline</Text>
                  </Button>
                </HStack>
              )}
            </HStack>
          </VStack>
        )}

        {selectedTab === 'sent' && (
          <HStack mt="2" alignItems="center" justifyContent="space-between">
            <HStack>
              <HStack
                p="0.5"
                mr="2"
                alignItems="center"
                style={byTime ? styles.fillBlueChallengeItem : styles.borderBlueChallengeItem}>
                <MaterialCommunityIcons
                  name="timer-outline"
                  size={32}
                  style={byTime ? styles.colorWhiteChallengeItem : styles.colorBlueChallengeItem}
                />
                <Text
                  px="1"
                  style={byTime ? styles.colorWhiteChallengeItem : styles.colorBlueChallengeItem}>
                  {convUserTime}
                </Text>
              </HStack>
              <HStack
                mx="2"
                alignItems="center"
                style={byTime ? styles.borderBlueChallengeItem : styles.fillBlueChallengeItem}>
                <MaterialCommunityIcons
                  name="map-marker-distance"
                  size={32}
                  style={byTime ? styles.colorBlueChallengeItem : styles.colorWhiteChallengeItem}
                />
                <Text
                  px="1"
                  style={byTime ? styles.colorBlueChallengeItem : styles.colorWhiteChallengeItem}>
                  {convUserKm}
                </Text>
              </HStack>
            </HStack>
            <HStack>
              <Button style={styles.buttonDeclineChallengeItem} onPress={DeleteSent}>
                <Text style={styles.colorOrangeChallengeItem}>Delete</Text>
              </Button>
            </HStack>
          </HStack>
        )}
      </TouchableOpacity>
    </View>
  );
}