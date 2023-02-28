import React, {useState, useEffect, useCallback} from 'react';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Box,
  HStack,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import ViewContainer from '../../components/MapContainer';
import firestore from '@react-native-firebase/firestore';
import {getDistance} from 'geolib';
import {useContext} from 'react';
import {AppStateContext} from '../../../App';
import {Button} from 'native-base';

const LOCATION_UPDATE_INTERVAL = 15000; // 15 seconds

export default function Map({route, navigation}) {
  const [watchingLocation, setWatchingLocation] = useState(false);
  const [locationHistory, setLocationHistory] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [watchId, setWatchId] = useState();
  const [latlng, setLatlng] = useState([]);

  const [timer, setTimer] = useState(0);
  const [timerId, setTimerId] = useState();
  const [distance, setDistance] = useState(0);

  const [challenger, setChallenger] = useState('');
  const [challenged, setChallenged] = useState('');
  const [velocityChallenger, setVelocityChallenger] = useState();
  const [velocityChallenged, setVelocityChallenged] = useState();

  const {user, run, setRun} = useContext(AppStateContext);


  console.log(Object.values(run))

  const [userData, setUserData] = useState();

  const [showChoice, setShowChoice] = useState(false);

  const [isRunning, setIsRunning] = useState(false)

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


  useEffect(() => {
    setChallenger(run.challenger);
    setChallenged(run.challenged);

    if (watchingLocation) {
      if (Platform.OS === 'android') {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ).then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const watchId = Geolocation.watchPosition(
              position => {
                // console.log(position + 'here');
                setCurrentLocation(position.coords);
                setLocationHistory(locationHistory => [
                  ...locationHistory,
                  position,
                ]);
                setLatlng(prevLocation => {
                  return [
                    ...prevLocation,
                    {
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude,
                    },
                  ];
                });

                if (latlng.length) {
                  const mran = getDistance(latlng[latlng.length - 1], {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                  });
                  console.log(mran);
                }
              },
              error => {
                console.log(error);
              },
              {
                enableHighAccuracy: true,
                distanceFilter: 0,
                interval: LOCATION_UPDATE_INTERVAL,
                fastestInterval: LOCATION_UPDATE_INTERVAL,
              },
            );
            setWatchId(watchId);
          }
        });
      } else {
        watchId = Geolocation.watchPosition(
          position => {
            //  console.log(position);
            setCurrentLocation(position.coords);
            setLocationHistory(locationHistory => [
              ...locationHistory,
              position,
            ]);
          },
          error => {
            console.log(error);
          },
          {
            enableHighAccuracy: true,
            distanceFilter: 0,
            interval: LOCATION_UPDATE_INTERVAL,
            fastestInterval: LOCATION_UPDATE_INTERVAL,
          },
        );
      }
    }

    return () => {
      if (watchId) {
        Geolocation.clearWatch(watchId);
        setWatchId(undefined);
        console.log(watchId);
      }
    };
  }, [watchingLocation]);


  const onStartWatching = () => {
    setWatchingLocation(true);
    const timerId = setInterval(
      () =>
        setTimer(prevTimer => {
          return prevTimer + 1;
        }),
      1000,
    );
    setTimerId(timerId);
  };

  const onStopWatching = () => {
    setWatchingLocation(false);
    Geolocation.clearWatch(watchId);
    setWatchId(undefined);

    clearInterval(timerId);

    // setTimer(0)
    // setDistance(0)
    setTimerId(null);
    console.log(challenger);
    console.log(challenged);

    if (challenger === userData.username) {
      setShowChoice(true);
    } else if (challenged === userData.username) {
      firestore()
        .collection('challenger')
        .doc(challenger)
        .collection('challenges')
        .doc(run.id)
        .update({
          accepted: true,
          challenged_date: Date.now(),
          challenged_km: distance,
          challenged_time: timer,
          finished: true,
        })
        .then(() => {
          console.log('I accepted a challenge');
        });

      firestore()
        .collection('challenged')
        .doc(challenged)
        .collection('challenges')
        .doc(run.id)
        .update({
          accepted: true,
          challenged_date: Date.now(),
          challenged_km: distance,
          challenged_time: timer,
          finished: true,
        })
        .then(() => {
          setVelocityChallenger(run.challenger_km / run.challenger_time);
          setVelocityChallenged(distance / timer);
          const increment = firestore.FieldValue.increment(1);
          if (run.byTime === true) {
            if (
              velocityChallenger >= velocityChallenged ||
              timer < run.challenger_time
            ) {
              firestore().collection('users').doc(user.uid).update({
                challenges_lost: increment,
                runs: increment,
              });
              firestore().collection('users').doc(run.challenger_id).update({
                challenges_won: increment,
                runs: increment,
              });
            } else {
              firestore().collection('users').doc(user.uid).update({
                challenges_won: increment,
                runs: increment,
              });
              firestore().collection('users').doc(run.challenger_id).update({
                challenges_lost: increment,
                runs: increment,
              });
            }
          } else {
            if (
              velocityChallenger >= velocityChallenged ||
              distance < run.challenger_km
            ) {
              firestore().collection('users').doc(user.uid).update({
                challenges_lost: increment,
                runs: increment,
              });
              firestore().collection('users').doc(run.challenger_id).update({
                challenges_won: increment,
                runs: increment,
              });
            } else {
              firestore().collection('users').doc(user.uid).update({
                challenges_won: increment,
                runs: increment,
              });
              firestore().collection('users').doc(run.challenger_id).update({
                challenges_lost: increment,
                runs: increment,
              });
            }
          }

          setRun({finished: true});
          navigation.navigate('Challenges');
        });
    }
  };
  console.log(user.uid);

  const PostTimeTrue = () => {
    firestore()
      .collection('challenger')
      .doc(challenger)
      .collection('challenges')
      .add({
        challenged: challenged,
        challenger_date: Date.now(),
        challenger_km: distance,
        challenger_time: timer,
        byTime: true,
      })
      .then(docRef => {
        console.log(docRef.id + ' this is for the docref');
        console.log('I challenged somebody');
        firestore()
          .collection('challenged')
          .doc(challenged)
          .collection('challenges')
          .doc(docRef.id)
          .set({
            challenger: challenger,
            challenger_id: user.uid,
            challenger_date: Date.now(),
            challenger_km: distance,
            challenger_time: timer,
            byTime: true,
          })
          .then(res => console.log(res))
          .catch(err => console.log(err));
        navigation.navigate('Challenges');
        setShowChoice(false);
      })
      .catch(err => console.log(err + ' from outside'));

    }
  const PostTimeFalse = () =>
    firestore()
      .collection('challenger')
      .doc(challenger)
      .collection('challenges')
      .add({
        challenged: challenged,
        challenger_date: Date.now(),
        challenger_km: distance,
        challenger_time: timer,
        byTime: false,
      })
      .then(docRef => {
        console.log(docRef.id + ' this is for the docref');
        console.log('I challenged somebody');
        firestore()
          .collection('challenged')
          .doc(challenged)
          .collection('challenges')
          .doc(docRef.id)
          .set({
            challenger: challenger,
            challenger_id: user.uid,
            challenger_date: Date.now(),
            challenger_km: distance,
            challenger_time: timer,
            byTime: false,
          })
          .then(res => console.log(res))
          .catch(err => console.log(err));
        navigation.navigate('Challenges');
        setShowChoice(false);
      })
      .catch(err => console.log(err + ' from outside'));

      const handleClickForRun = () => {
        if(isRunning) {
          onStopWatching()
        } else {
          onStartWatching()
        }
        setIsRunning(!isRunning)
      }

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
    return `${km} km ${hm}:${dm < 10 ? '0' : ''}${dm}`;
  };

  return (<View style={styles.container}>
    {Object.keys(run).length ? (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.sectionContainer}>
          <Text>Time: {formatTime(timer)}</Text>
          <Text>Distance: {formatDistance(distance)}</Text>
        </View>
        {showChoice === false && (
          <View style={styles.theButtons}>
            <Button
        style={styles.button}
        onPress={handleClickForRun}
      >{isRunning ? 'Stop Running' : 'Start Running'}</Button>
          </View>
        )}

        {latlng.length && currentLocation ? (
          <ViewContainer latlng={latlng} currentLocation={currentLocation} />
        ) : null}
      </ScrollView>
      {showChoice === true && (
        <View>
        <Text style={styles.customText}>Challenge your opponent by:</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 20 }}>
          <Button style={styles.logoutButton} onPress={PostTimeTrue}>TIME</Button>
          <Button style={styles.logoutButton} onPress={PostTimeFalse}>DISTANCE</Button>
        </View>
      </View>
      )}
    </SafeAreaView>
  ) : ( <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={styles.customText}>Challenge someone to start a run</Text>
    <Button style={styles.logoutButton} onPress={() => { navigation.navigate('Search')}}>Seek a challenger</Button>
    </View>
    )
}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF6ED'
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  button: {
    color: '#50A5B1',
    padding: 16,
    marginVertical: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FEF6ED'
  },
  theButtons: {
    marginTop: 32,
    paddingHorizontal: 24,
    marginTop: 32,
    width: 175
  },
  logoutButton: {
    backgroundColor: "#50A5B1",
    width: 150,
  },
  customText: {
    color: '#1A265A',
    fontSize: 22,
    fontWeight: '600',
    paddingBottom: 20,
  }
});
