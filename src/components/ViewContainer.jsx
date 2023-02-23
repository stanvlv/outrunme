import MapView, {Marker, Polyline} from 'react-native-maps';
import { StyleSheet } from 'react-native';
import {View} from "react-native";

export default function ViewContainer({currentLocation, latlng}) {

return (
    <View style={styles.containerMap}>
   <MapView
    showsUserLocation={true}
      style={styles.map}
      region={{
        latitude: 37.8025259,
        longitude: -122.4351431,
        latitudeDelta: 0.0115,
        longitudeDelta: 0.0121,
      }}
    >
      <Polyline 
      coordinates={[
        { latitude: 37.8025259, longitude: -122.4351431 },
        { latitude: 37.7896386, longitude: -122.421646 },
        { latitude: 37.7665248, longitude: -122.4161628 },
        { latitude: 37.7734153, longitude: -122.4577787 },
        { latitude: 37.7948605, longitude: -122.4596065 },
        { latitude: 37.8025259, longitude: -122.4351431 }
      ]}
      strokeColor='pink'
      fillColor='pink'
      strokeWidth={6}
      />
    </MapView>
  </View>
)
}


const styles = StyleSheet.create({
    
    containerMap: {
    //   ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },

})