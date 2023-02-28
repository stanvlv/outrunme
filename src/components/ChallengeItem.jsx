import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {
  VStack,
  Input,
  NativeBaseProvider,
  Button,
  Link,
  Box,
} from 'native-base';
import {useContext} from 'react';
import {AppStateContext} from '../../App';

export default function ChallengeItem({
  item,
  key,
  title,
  userTime,
  userKm,
  otherTime,
  otherKm,
  nameTile,
  showButtons,
  navigation,
  userData,
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

  const formatTime = timer => {
    const minutes = Math.floor(timer / 60);
    const remainingSeconds = timer % 60;
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(remainingSeconds).padStart(2, '0');
    return `${minutesStr}:${secondsStr}`;
  };
  const formatDistance = distance => {
    const km = Math.floor(distance / 1000); // get km
    const hm = Math.floor((distance - km * 1000) / 100); // get hundreds of meters
    const dm = Math.floor((distance - km * 1000 - hm * 100) / 10); // get tenths of meters
    return `${km}.${hm}${dm} km`;
  };

  const timestamp = item.challenger_date;
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString();

  return (
    <View>
      {/* Header */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleClick}
        style={styles.header}>
        <Text style={styles.headerText}>
          {title} {nameTile} on {formattedDate}
        </Text>
        {item.accepted === false && (
          <Text style={{textAlign: 'right', color: 'red'}}>Rejected</Text>
        )}
      </TouchableOpacity>
      <View
        style={{
          height: layoutHeight,
          overflow: 'hidden',
        }}>
        {/*Details*/}
        {userTime ? (
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
      </View>
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
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#50A5B1'
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
});
