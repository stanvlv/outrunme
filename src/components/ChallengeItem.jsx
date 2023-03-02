import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
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
import {useContext} from 'react';
import {AppStateContext} from '../../App';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ChallengeItem({
  item,
  key,
  title,
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
    });
    // Add a win challenge on challenger profile
    firestore().collection('users').doc(item.challenger_id).update({
      challenges_won: increment,
    });
  };

  const DeleteRejected = () => {
    if (item.challenger) {
      firestore()
        .collection('challenged')
        .doc(`${userData}`)
        .collection('challenges')
        .doc(`${item.id}`)
        .delete();
    } else {
      firestore()
        .collection('challenger')
        .doc(`${userData}`)
        .collection('challenges')
        .doc(`${item.id}`)
        .delete();
    }
  };

  const onClick = () => {
    setRun({
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
  const timestamp = item.challenger_date;
  const formattedDate = date.toLocaleDateString();
  const convUserKm = formatDistance(userKm);
  const convOtherKm = formatDistance(otherKm);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleClick}
        style={styles.header}>
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
                <Text style={styles.headerText} ml="6" py="2">
                  {nameTile}
                </Text>
              </HStack>

              <Text style={styles.date}>
                {weekDay} {finalTime}
              </Text>
            </HStack>

            <HStack justifyContent="space-between" alignItems="flex-end" ml="2">
              {otherKm === '***' && (
                <HStack p="0.5" alignItems="center" style={styles.fillBlue}>
                  <MaterialCommunityIcons
                    name="timer-outline"
                    size={32}
                    style={styles.colorWhite}
                  />
                  <Text px="1" style={styles.colorWhite}>
                    {RunTime}
                  </Text>
                </HStack>
              )}
              {otherTime === '***' && (
                <HStack alignItems="center" style={styles.fillBlue}>
                  <MaterialCommunityIcons
                    name="map-marker-distance"
                    size={30}
                    style={styles.colorWhite}
                  />
                  <Text px="1" style={styles.colorWhite}>
                    {convOtherKm}
                  </Text>
                </HStack>
              )}

              {selectedTab === 'received' && item.accepted !== false && (
                <HStack>
                  <Button mx="5" style={styles.buttonAccept} onPress={onClick}>
                    <Text style={styles.colorBlue}>Accept</Text>
                  </Button>
                  <Button style={styles.buttonDecline} onPress={PostRejected}>
                    <Text style={styles.colorOrange}>Decline</Text>
                  </Button>
                </HStack>
              )}
            </HStack>
          </VStack>
        )}
        {/*   {item.accepted === false && (
              <Text style={styles.rejected}>Rejected</Text>
            )} */}
        {/* distance and time labels on sent */}

        {selectedTab === 'sent' && (
          <HStack mt="2" justifyContent="center" alignItems="center">
            <HStack
              px="0.5"
              mx="2"
              alignItems="center"
              style={byTime ? styles.fillBlue : styles.borderBlue}>
              <MaterialCommunityIcons
                name="timer-outline"
                size={30}
                style={byTime ? styles.colorWhite : styles.colorBlue}
              />
              <Text
                px="1"
                style={byTime ? styles.colorWhite : styles.colorBlue}>
                {convUserTime}
              </Text>
            </HStack>
            <HStack
              mx="2"
              alignItems="center"
              style={byTime ? styles.borderBlue : styles.fillBlue}>
              <MaterialCommunityIcons
                name="map-marker-distance"
                size={30}
                style={byTime ? styles.colorBlue : styles.colorWhite}
              />
              <Text
                px="1"
                style={byTime ? styles.colorBlue : styles.colorWhite}>
                {convUserKm}
              </Text>
            </HStack>
          </HStack>
        )}
      </TouchableOpacity>
      {/* <View
        style={{
          height: layoutHeight,
          overflow: 'hidden',
        }}> */}
      {/*Details*/}
      {/* {userTime ? (
          <TouchableOpacity key={key} style={styles.content}>
            <Text style={styles.text}>your Stats</Text>
            <Text style={styles.text}>time: {formatTime(userTime)} min</Text>
            <Text style={styles.text}>distance: {formatDistance(userKm)} </Text>
            <View style={styles.separator} />
          </TouchableOpacity>
        ) : null}
        {otherTime ? (
          <TouchableOpacity key={key} style={styles.content}>
            <Text style={styles.text}>their Stats</Text>
            <Text style={styles.text}>time: {formatTime(otherTime)}</Text>
            <Text style={styles.text}>distance: {formatDistance(otherKm)} </Text>
          </TouchableOpacity>
        ) : null}
        {showButtons && item.accepted !== false && (
          <Link>
            <Button onPress={onClick}>Accept</Button>

            <Button onPress={PostRejected}>Reject</Button>
          </Link>
        )}
        {item.accepted === false && (
          <Button onPress={DeleteRejected}>Delete</Button>
        )}
      </View> */}
    </View>
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
    backgroundColor: '#FEF6ED',
    opacity: 0.8,
    borderColor: '#50A5B1',
    padding: 20,
    borderTopColor: '#50A5B1',
    borderTopWidth: 0.5,
  },
  headerText: {
    fontSize: 25,
    fontWeight: '500',
  },
  separator: {
    height: 1.5,
    backgroundColor: '#F1600D',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    color: '#1A265A',
    padding: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#50A5B130',
  },

  date: {
    textAlign: 'right',
    fontSize: 12,
  },

  timeKm: {
    fontSize: 19,
  },

  // time and distance labels:

  colorBlue: {
    color: '#50A5B1',
  },

  fillBlue: {
    borderColor: '#50A5B1',
    borderWidth: 2,
    borderRadius: 7,
    backgroundColor: '#50A5B1',
  },

  borderBlue: {
    borderColor: '#50A5B1',
    borderWidth: 2,
    borderRadius: 7,
  },

  colorWhite: {
    color: 'white',
  },

  colorOrange: {
    color: '#F1600D',
  },

  buttonDecline: {
    marginTop: 2,
    backgroundColor: 'transparent',
    padding: 7,
    borderColor: '#F1600D',
    borderWidth: 2,
    borderRadius: 7,
  },

  buttonAccept: {
    marginTop: 2,
    backgroundColor: 'transparent',
    padding: 7,
    borderColor: '#50A5B1',
    borderWidth: 2,
    borderRadius: 7,
  },

  colorWhite: {
    color: 'white',
  },

  rejected: {
    fontSize: 18,
    color: '#F1600D',
  },
});
