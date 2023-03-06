import MapView, {Polyline} from 'react-native-maps';
import {styles} from '../styles/Style';
import {View} from 'react-native';

export default function ViewContainer({currentLocation, latlng}) {
  console.log(latlng);
  return (
    <View style={styles.containerMapMapContainer}>
      <MapView
        showsUserLocation={true}
        style={styles.mapMapContainer}
        region={{
          latitude: currentLocation?.latitude,
          longitude: currentLocation?.longitude,
          latitudeDelta: 0.0115,
          longitudeDelta: 0.0121,
        }}>
        <Polyline
          coordinates={latlng}
          strokeColor="#1A265A"
          fillColor="#1A265A"
          strokeWidth={8}
        />
      </MapView>
    </View>
  );
}
