import React, {useState, useEffect, useCallback} from 'react';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {
  VStack,
  Input,
  NativeBaseProvider,
  Button,
  Link,
  Box,
  HStack,
  Center,
  Progress,
} from 'native-base';
import Geolocation from 'react-native-geolocation-service';
import ViewContainer from '../../components/MapContainer';
import firestore from '@react-native-firebase/firestore';
import {getDistance} from 'geolib';
import {useContext} from 'react';
import {AppStateContext} from '../../../App';
import TimerItem from '../../components/TimerItem';
import DistanceItem from '../../components/DistanceItem';

const LOCATION_UPDATE_INTERVAL = 5000; // 15 seconds

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
  const [userWinner, setUserWinner] = useState(true);

  const {user, run, setRun} = useContext(AppStateContext);

  // console.log(Object.values(run));

  const [userData, setUserData] = useState();

  const [showChoice, setShowChoice] = useState(false);

  const [isRunning, setIsRunning] = useState(false);

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
    // this effect runs whenever the `latlng` array changes
    if (latlng.length >= 2) {
      const lastLatLng = latlng[latlng.length - 2];
      const currentLatLng = latlng[latlng.length - 1];
      const mran = getDistance(lastLatLng, currentLatLng);
      setDistance(prevDistance => prevDistance + mran);
    }
  }, [latlng]);

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
                // if (latlng.length) {
                //   const mran = getDistance(latlng[latlng.length - 1], {
                //     latitude: position.coords.latitude,
                //     longitude: position.coords.longitude,
                //   });
                //   setDistance(prevDistance => prevDistance + mran);
                //   console.log(distance + ` this is supposed to be the distance in meters`)
                // }
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
        // console.log(watchId);
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
    // console.log(challenger);
    // console.log(challenged);

    if (challenger === userData.username) {
      setShowChoice(true);
    } else if (challenged === userData.username) {
      // Check if the user lost
      const velocityChallenger = run.challenger_km / run.challenger_time;
      const velocityChallenged = distance / timer;
      // console.log(velocityChallenged + 'challenged velocity');
      // console.log(distance + 'challenged distance');
      // console.log(timer + 'challenged timer');
      // console.log(velocityChallenger + 'challenger velocity');
      // console.log(run.challenger_km + 'challenger distance');
      // console.log(run.challenger_time + 'challenger timer');
      if (run.byTime === true) {
        if (
          velocityChallenger >= velocityChallenged ||
          timer < run.challenger_time
        ) {
          setUserWinner(false);
        }
      } else {
        if (
          velocityChallenger >= velocityChallenged ||
          distance < run.challenger_km
        ) {
          setUserWinner(false);
        }
      }
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
          challenged_coordinates: latlng,
          winner: !userWinner,
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
          challenged_coordinates: latlng,
          winner: userWinner,
        })
        .then(() => {
          const increment = firestore.FieldValue.increment(1);

          if (userWinner === false) {
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

          setRun({finished: true});
          navigation.navigate('Challenges');
          setTimer(0);
          setDistance(0);
        });
    }
  };
  // console.log(user.uid);

  // console.log(latlng + ` this will be saved for coordinates`);
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
        challenger_coordinates: latlng,
      })
      .then(docRef => {
        // console.log(docRef.id + ' this is for the docref');
        // console.log('I challenged somebody');
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
            challenger_coordinates: latlng,
          })
          .then(res => console.log(res))
          .catch(err => console.log(err));
        setRun({sent: true});
        navigation.navigate('Challenges');
        setShowChoice(false);
        setTimer(0);
        setDistance(0);
      })
      .catch(err => console.log(err + ' from outside'));
  };
  const PostTimeFalse = () => {
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
        challenger_coordinates: latlng,
      })
      .then(docRef => {
        // console.log(docRef.id + ' this is for the docref');
        // console.log('I challenged somebody');
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
            challenger_coordinates: latlng,
          })
          .then(res => console.log(res))
          .catch(err => console.log(err));
        setRun({sent: true});
        navigation.navigate('Challenges');
        setShowChoice(false);
        setTimer(0);
        setDistance(0);
      })
      .catch(err => console.log(err + ' from outside'));
  };
  const handleClickForRun = () => {
    if (isRunning) {
      onStopWatching();
    } else {
      onStartWatching();
    }
    setIsRunning(!isRunning);
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

  const convertTime = time => {
    const dt = new Date(time);
    const hr = dt.getUTCHours();
    const m = '0' + dt.getUTCMinutes();
    const s = '0' + dt.getSeconds();
    return hr + ':' + m.slice(-2) + ':' + s.slice(-2);
  };

  // const formatDistance = distance => {
  //   const km = Math.floor(distance / 1000); // get km
  //   const hm = Math.floor((distance - km * 1000) / 100); // get hundreds of meters
  //   const dm = Math.floor((distance - km * 1000 - hm * 100) / 10); // get tenths of meters
  //   return `${km} km ${hm}:${dm < 10 ? '0' : ''}${dm}`;
  // };
  const formatDistance = distance => {
    const km = Math.floor(distance / 1000); // get km
    const hm = Math.floor((distance - km * 1000) / 100); // get hundreds of meters
    const dm = Math.floor((distance - km * 1000 - hm * 100) / 10); // get tenths of meters

    return `${km}.${hm}${dm} km`;
  };
  const convChallengerKm = formatDistance(run.challenger_km);
  const convChallengerTime = formatTime(run.challenger_time);
  const progressionDistance = (distance * 100) / run.challenger_km;
  const progressionTime = (timer * 100) / run.challenger_time;

  useEffect(() => {
    if (run.byTime) {
      console.log(progressionTime);
      if (progressionTime >= 100) {
        clearInterval(timerId);
        onStopWatching();
        setIsRunning(false);
      }
    } else if (progressionDistance >= 100) {
      clearInterval(timerId);
      onStopWatching();
      setIsRunning(false);
    }
  }, [progressionTime, progressionDistance]);

  return (
    <View style={styles.container}>
      {/* Show Map */}
      {currentLocation ? (
        <HStack justifyContent="center">
          <ViewContainer latlng={latlng} currentLocation={currentLocation} />
        </HStack>
      ) : null}
      {Object.keys(run).length ? (
        <SafeAreaView style={styles.container}>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            {run.byTime ? (
              <VStack>
                <TimerItem timer={timer} byTime={run.byTime} />
                {run.challenged === userData?.username ? (
                  <Center w="100%">
                    <Box w="95%" maxW="400">
                      <Progress
                        colorScheme="warning"
                        value={progressionTime}
                        style={styles.colorOrange}
                        size="2xl"
                        rounded="0"
                        bg="white"
                        borderColor="#50A5B1"
                        borderWidth="2"
                        shadow="10"
                      />
                      <HStack
                        backgroundColor="#50A5B1"
                        mb="5"
                        px="2"
                        py="1"
                        justifyContent="flex-end">
                        <Text style={styles.TextMiniWhite}>
                          {convChallengerTime}
                        </Text>
                      </HStack>
                    </Box>
                  </Center>
                ) : null}
                <DistanceItem distance={distance} byTime={run.byTime} />
              </VStack>
            ) : (
              <VStack>
                <DistanceItem distance={distance} byTime={run.byTime} />
                {run.challenged === userData?.username ? (
                  <Center w="100%">
                    <Box w="95%" maxW="400">
                      <Progress
                        colorScheme="warning"
                        value={progressionDistance}
                        style={styles.colorOrange}
                        size="2xl"
                        rounded="0"
                        bg="white"
                        borderColor="#50A5B1"
                        borderWidth="2"
                        shadow="10"
                      />
                      <HStack
                        backgroundColor="#50A5B1"
                        mb="5"
                        px="2"
                        py="1"
                        justifyContent="flex-end">
                        <Text style={styles.TextMiniWhite}>
                          {`${convChallengerKm} Km`}
                        </Text>
                      </HStack>
                    </Box>
                  </Center>
                ) : null}
                <TimerItem timer={timer} byTime={run.byTime} />
              </VStack>
            )}
            {showChoice === false ? (
              <HStack style={styles.theButtons} mx="auto">
                <Button
                  style={styles.button}
                  colorScheme="warning"
                  onPress={handleClickForRun}
                  py="2"
                  width="95%">
                  <Text style={styles.buttonStartText}>
                    {isRunning ? 'Stop' : 'Start'}
                  </Text>
                </Button>
              </HStack>
            ) : (
              <VStack>
                <HStack justifyContent="center" mt="5">
                  <Text style={styles.customText}>
                    Challenge your opponent by:
                  </Text>
                </HStack>
                <HStack
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    paddingBottom: 20,
                  }}>
                  <Button style={styles.logoutButton} onPress={PostTimeTrue}>
                    TIME
                  </Button>
                  <Button style={styles.logoutButton} onPress={PostTimeFalse}>
                    DISTANCE
                  </Button>
                </HStack>
              </VStack>
            )}
          </ScrollView>
        </SafeAreaView>
      ) : (
        // Redirect to search User
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.customText}>
            Challenge someone to start a run
          </Text>
          <Button
            style={styles.logoutButton}
            onPress={() => {
              navigation.navigate('Search');
            }}>
            Seek a challenger
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF6ED',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },

  colorOrange: {
    color: '#F1600D',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  button: {
    color: 'white',
    paddingHorizontal: 30,
    bottom: 0,
    borderRadius: 12,
  },
  buttonText: {
    color: '#FEF6ED',
  },

  buttonStartText: {
    fontSize: 40,
    color: 'white',
  },
  theButtons: {
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: '#50A5B1',
    width: 150,
  },
  customText: {
    color: '#1A265A',
    fontSize: 22,
    fontWeight: '600',
    paddingBottom: 20,
  },
  TextMiniWhite: {
    color: 'white',
  },
});
