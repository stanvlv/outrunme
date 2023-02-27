import MapView, {Marker, Polyline} from 'react-native-maps';
import { StyleSheet } from 'react-native';
import {View} from "react-native";

export default function ViewContainer({currentLocation, latlng}) {
console.log(latlng)
return (
    <View style={styles.containerMap}>
   <MapView
    showsUserLocation={true}
      style={styles.map}
      region={{
        latitude: currentLocation?.latitude,
        longitude: currentLocation?.longitude,
        latitudeDelta: 0.0115,
        longitudeDelta: 0.0121,
      }}
    >
      <Polyline 
      coordinates={latlng}
      strokeColor='#1A265A'
      fillColor='#1A265A'
      strokeWidth={8}
      />
    </MapView>
  </View>
)
}


const styles = StyleSheet.create({
    
    containerMap: {
      display: 'flex',
    //   ...StyleSheet.absoluteFillObject,
      height: 275,
      width: 275,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },

})