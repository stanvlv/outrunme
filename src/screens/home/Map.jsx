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
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import ViewContainer from '../../components/ViewContainer';
import firestore from '@react-native-firebase/firestore';
import {getDistance} from 'geolib';

const LOCATION_UPDATE_INTERVAL = 5000; // 15 seconds

export default function Map() {
  const [watchingLocation, setWatchingLocation] = useState(false);
  const [locationHistory, setLocationHistory] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [watchId, setWatchId] = useState();
  const [latlng, setLatlng] = useState([]);
  const [timer, setTimer] = useState(0);
  const [timerId, setTimerId] = useState();
  const [distance, setDistance] = useState(0);

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
    return `${km} km ${hm}:${dm < 10 ? '0' : ''}${dm}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Location History</Text>
          <Text>Time: {formatTime(timer)}</Text>
          <Text>Distance: {formatDistance(distance)}</Text>
          {/* {locationHistory.map((location, index) => (
            <Text key={index}>
              {location.coords.latitude}, {location.coords.longitude}
            </Text>
          ))} */}
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
        {latlng.length && currentLocation ? (
          <ViewContainer latlng={latlng} currentLocation={currentLocation} />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

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
  },
});
