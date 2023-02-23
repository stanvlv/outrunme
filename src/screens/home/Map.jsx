import React, {useState, useEffect} from 'react';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import ViewContainer from '../../components/ViewContainer';
import firestore from '@react-native-firebase/firestore';

const LOCATION_UPDATE_INTERVAL = 5000; // 15 seconds

export default function Map() {
  const [watchingLocation, setWatchingLocation] = useState(false);
  const [locationHistory, setLocationHistory] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [watchId, setWatchId] = useState();
    const [latlng, setLatlng] = useState([])
//   useEffect(() => {
//     if (watchingLocation) {
//       // ... watch location changes and update location state
//       setStartTime(new Date());
//     } else {
//       setStartTime(null);
//       setElapsedTime(null);
//     }
//   }, [watchingLocation]);

//   useEffect(() => {
//     if (startTime) {
//       const interval = setInterval(() => {
//         const now = new Date();
//         const elapsedTime = Math.floor((now - startTime) / 1000 / 60);
//         setElapsedTime(elapsedTime);
//       }, 60000);
//       return () => clearInterval(interval);
//     }
//   }, [startTime]);

  useEffect(() => {

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
                   return [...prevLocation, {latitude: position.coords.latitude, longitude: position.coords.longitude}]
                })
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
           setWatchId(watchId)
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
        setWatchId(undefined)
        console.log(watchId)
      }
    };
  }, [watchingLocation]);

  const onStartWatching = () => {
    setWatchingLocation(true);
  };

  const onStopWatching = () => {
    setWatchingLocation(false);
      Geolocation.clearWatch(watchId);
    setWatchId(undefined)

firestore()
  .collection('challenger')
  .doc(`${userData}`)
  .collection('challenges')
  .add({
    name: 'Ada Lovelace',
    age: 30,
  })
  .then(() => {
    console.log('User added!');
  });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Location History</Text>
          {locationHistory.map((location, index) => (
            <Text key={index}>
              {location.coords.latitude}, {location.coords.longitude}
            </Text>
          ))}
        </View>
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={onStartWatching}
            // disabled={watchingLocation}
            >
            <Text style={styles.buttonText}>Start Watching</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={onStopWatching}
            // disabled={!watchingLocation}
            >
            <Text style={styles.buttonText}>Stop Watching</Text>
          </TouchableOpacity>
        </View>
       {latlng.length && currentLocation ? <ViewContainer latlng={latlng} currentLocation={currentLocation} /> : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    
  container: {
    flex: 1,
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
    backgroundColor: '#2196F3',
    padding: 16,
    marginVertical: 8,
    borderRadius: 4,
  }
})