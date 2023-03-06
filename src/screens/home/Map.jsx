import React, {useState, useEffect} from 'react';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from 'react-native';
import {
  VStack,
  Button,
  Box,
  HStack,
  Center,
  Progress,
} from 'native-base';
import Geolocation from 'react-native-geolocation-service';
import ViewContainer from '../../components/MapContainer';
import firestore from '@react-native-firebase/firestore';
import {getDistance} from 'geolib';
import { styles } from '../../styles/Style';
import {useContext} from 'react';
import {AppStateContext} from '../../../App';
import TimerItem from '../../components/TimerItem';
import DistanceItem from '../../components/DistanceItem';
import {firebase} from '@react-native-firebase/functions';
import { pushNotification } from '../../../pushNotification';


const LOCATION_UPDATE_INTERVAL = 5000; // 15 seconds

export default function Map({navigation}) {
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
      }
    };
  }, [watchingLocation]);

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

    setTimerId(null);

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
              streak: 0,
            });
            loseOnePoint(user.uid);
            firestore().collection('users').doc(run.challenger_id).update({
              challenges_won: increment,
              runs: increment,
              points: increment,
              streak: increment,
            });
          } else {
            firestore().collection('users').doc(user.uid).update({
              challenges_won: increment,
              runs: increment,
              points: increment,
              streak: increment,
            });
            firestore().collection('users').doc(run.challenger_id).update({
              challenges_lost: increment,
              runs: increment,
              streak: 0,
            });
            loseOnePoint(run.challenger_id);
          }

          setRun({finished: true});
          navigation.navigate('Challenges');
          setTimer(0);
          setDistance(0);
          setLatlng([]);
          setRun({showMap: false});
        });
    }
  };

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
        setLatlng([]);
        setRun({showMap: false});
        pushNotification(run.challenged_fcmToken)
          

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
        setLatlng([]);
        setRun({showMap: false});
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
    <View style={styles.containerMap}>
      {/* Show Map */}
      {currentLocation ? (
        <HStack justifyContent="center">
          <ViewContainer latlng={latlng} currentLocation={currentLocation} />
        </HStack>
      ) : null}
      {Object.keys(run).length > 1 ? (
        <SafeAreaView style={styles.containerMap}>
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
                        style={styles.colorOrangeMap}
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
                        <Text style={styles.TextMiniWhiteMap}>
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
                        style={styles.colorOrangeMap}
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
                        <Text style={styles.TextMiniWhiteMap}>
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
              <HStack style={styles.theButtonsMap} mx="auto">
                <Button
                  style={styles.buttonMap}
                  colorScheme="warning"
                  onPress={handleClickForRun}
                  py="2"
                  width="95%">
                  <Text style={styles.buttonStartTextMap}>
                    {isRunning ? 'Stop' : 'Start'}
                  </Text>
                </Button>
              </HStack>
            ) : (
              <VStack>
                <HStack justifyContent="center" mt="5">
                  <Text style={styles.customTextMap}>
                    Challenge your opponent by:
                  </Text>
                </HStack>
                <HStack
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    paddingBottom: 20,
                  }}>
                  <Box style={styles.logoutButton}>
                    <Button colorScheme="warning" onPress={PostTimeTrue}>
                      TIME
                    </Button>
                  </Box>
                  <Box style={styles.logoutButton}>
                    <Button colorScheme="warning" onPress={PostTimeFalse}>
                      DISTANCE
                    </Button>
                  </Box>
                </HStack>
              </VStack>
            )}
          </ScrollView>
        </SafeAreaView>
      ) : (
        // Redirect to search User
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.customTextMap}>
            Challenge someone to start a run
          </Text>
          <Button
            colorScheme="warning"
            onPress={() => {
              navigation.navigate('Search');
            }}>
            Search
          </Button>
        </View>
      )}
    </View>
  );

}
