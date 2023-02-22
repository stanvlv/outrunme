import {Box, Button, NativeBaseProvider} from 'native-base';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import {useEffect, useState} from 'react';
import MapView from 'react-native-maps';
import {enableLatestRenderer} from 'react-native-maps/lib/MapView';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';

export default function Map() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const requestGpsPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Some text from the title',
            message: 'Some message from the permission',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('GPS permission granted');
          Geolocation.getCurrentPosition(
            position => {
              setPosition(position.coords);
            },
            error => {
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        } else {
          console.log('GPS permission denied');
        }
      } catch (error) {
        console.log(error);
      }
    };

    requestGpsPermission();
  }, []);

  return (
    <NativeBaseProvider>
      <Box>Hello from the Map Screen</Box>
      {!position && (
        <Button onPress={() => requestGpsPermission()}>Turn on GPS</Button>
      )}
      {position && (
        <Box>
          <Box>Latitude: {position.latitude}</Box>
          <Box>Longitude: {position.longitude}</Box>

          <Box style={styles.container}>
            <MapView
              style={styles.map}
              region={{
                latitude: position.latitude,
                longitude: position.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            />
          </Box>
        </Box>
      )}
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    //    ...StyleSheet.absoluteFillObject, // this somehow sends the map down
    height: 400,
    width: 4000,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
