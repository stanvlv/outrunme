import React, {useEffect, useState} from 'react';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {
  VStack,
  Input,
  NativeBaseProvider,
  Button,
  Link,
  Box,
  HStack,
  Text,
  Center,
} from 'native-base';
import {useContext} from 'react';
import {AppStateContext} from '../../App';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FinishedChallenges({
    item,
    key,
    title,
    userTime,
    userKm,
    otherTime,
    otherKm,
    nameTile,
    selectedTab,
    navigation,
    userData,
    sent,
    byTime,
    winner,
    userCoordinates,
    opponentCoordinates
}) {
 
    const [myLayoutHeight, setMyLayoutHeight] = useState(0);
    const [opponentLayoutHeight, setOpponentLayoutHeight] = useState(0);
    const [opponentMapClick, setOpponentMapClick] = useState(false);
    const [myMapClick, setMyMapClick] = useState(false);

    const clickOpponentMap = () => {
      if(myMapClick) {       
       setMyMapClick(!myMapClick);
   }
    setOpponentMapClick(!opponentMapClick);
};
   const clickMyMap = () => {
     if(opponentMapClick) {
       setOpponentMapClick(!opponentMapClick)
   }  
       
       setMyMapClick(!myMapClick)
  
};

  useEffect(() => {
    if (opponentMapClick) {
      setOpponentLayoutHeight('auto');
    } else {
      setOpponentLayoutHeight(0);
    }
  }, [opponentMapClick]);

  useEffect(() => {
    if (myMapClick) {
      setMyLayoutHeight('auto');
    } else {
      setMyLayoutHeight(0);
    }
  }, [myMapClick]);

  const date = new Date(item.challenger_date);
  const numb = date.getDay();

  if (numb === 0) {
    weekDay = 'Sun.';
  } else if (numb === 1) {
    weekDay = 'Mon.';
  } else if (numb === 2) {
    weekDay = 'Tue.';
  } else if (numb === 3) {
    weekDay = 'Wed.';
  } else if (numb === 4) {
    weekDay = 'Thu.';
  } else if (numb === 5) {
    weekDay = 'Fri.';
  } else if (numb === 6) {
    weekDay = 'Sat.';
  }

  const convertDateHours = time => {
    const dt = new Date(time);
    const hr = '0' + dt.getHours();
    const m = '0' + dt.getMinutes();
    return hr.slice(-2) + ':' + m.slice(-2);
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


  const finalDateTime = convertDateHours(item.challenger_date);
  const RunTime = formatTime(otherTime);
  



    const convertDate = time => {
      const dt = new Date(time);
      const hr = dt.getUTCHours();
      const m = '0' + dt.getUTCMinutes();
      const s = '0' + dt.getSeconds();
  
      return hr + ':' + m.slice(-2) + ':' + s.slice(-2);
    };
  
    const finalTime = convertDate(item.challenger_date);
 
  
 

    const convOpponentTime = formatTime(otherTime);
    const convUserTime = formatTime(userTime);
  
  
    const formatDistance = distance => {
      const km = Math.floor(distance / 1000); // get km
      const hm = Math.floor((distance - km * 1000) / 100); // get hundreds of meters
      const dm = Math.floor((distance - km * 1000 - hm * 100) / 10); // get tenths of meters
      return `${km}.${hm}${dm} km`;
    };
  
    const timestamp = item.challenger_date;
    const formattedDate = date.toLocaleDateString();
    const convUserKm = formatDistance(userKm);
    const convOpponentKm = formatDistance(otherKm);
  




  return (
    <View style={{padding: 10}}>
      {selectedTab === 'finished' && (
        <VStack space={3}>
          <HStack justifyContent="flex-end">
            <Text style={styles.date}>
              {weekDay} {finalDateTime}
            </Text>
          </HStack>
          <HStack>
            <TouchableOpacity onPress={clickMyMap}>
              <VStack alignItems="center" my="1" style={{flex: 2}}>
                <Text style={styles.headerText} py="2">
                  {userData}
                </Text>

                <HStack
                  px="0.5"
                  my="3"
                  alignItems="center"
                  style={byTime ? styles.fillBlue : styles.borderBlue}>
                  <MaterialCommunityIcons
                    name="timer-outline"
                    size={30}
                    style={byTime ? styles.colorWhite : styles.colorBlue}
                  />
                  <Text
                    px="1"
                    style={byTime ? styles.colorWhite : styles.colorBlue}>
                    {convUserTime}

                  </Text>
                </HStack>
                <HStack
                  alignItems="center"

                  style={byTime ? styles.borderBlue : styles.fillBlue}>
                  <MaterialCommunityIcons
                    name="map-marker-distance"
                    size={30}
                    style={byTime ? styles.colorBlue : styles.colorWhite}
                  />
                  <Text
                    px="1"
                    style={byTime ? styles.colorBlue : styles.colorWhite}>
                    {convUserKm}
                  </Text>
                </HStack>
              </VStack>
            </TouchableOpacity>
            <VStack
              style={{flex: 1}}
              alignItems="center"
              justifyContent="center">
              {sent ? (
                <MaterialCommunityIcons
                  name="sword-cross"
                  size={60}
                  style={winner ? {color: '#50A5B1'} : {color: '#F1600D'}}
                />
              ) : (
                <MaterialCommunityIcons
                  name="shield-sword"
                  size={60}
                  style={winner ? {color: '#50A5B1'} : {color: '#F1600D'}}
                />
              )}

            </VStack>
            <TouchableOpacity onPress={clickOpponentMap}>
              <VStack alignItems="center" my="1" style={{flex: 2}}>
                <Text style={styles.headerText} py="2">
                  {nameTile}
                </Text>
                <HStack
                  px="0.5"
                  my="3"
                  alignItems="center"
                  style={byTime ? styles.fillBlue : styles.borderBlue}>
                  <MaterialCommunityIcons
                    name="timer-outline"
                    size={30}
                    style={byTime ? styles.colorWhite : styles.colorBlue}
                  />
                  <Text
                    px="1"
                    style={byTime ? styles.colorWhite : styles.colorBlue}>
                    {RunTime}
                  </Text>
                </HStack>
                <HStack
                  alignItems="center"
                  style={byTime ? styles.borderBlue : styles.fillBlue}>
                  <MaterialCommunityIcons
                    name="map-marker-distance"
                    size={30}
                    style={byTime ? styles.colorBlue : styles.colorWhite}
                  />
                  <Text
                    px="1"
                    style={byTime ? styles.colorBlue : styles.colorWhite}>
                    {convOpponentKm}
                  </Text>
                </HStack>
              </VStack>
            </TouchableOpacity>
          </HStack>
        </VStack>
      )}

      <View
        style={{
          height: myLayoutHeight,
          overflow: 'hidden',
        }}>
        {userTime ? (
          <TouchableOpacity key={key} style={styles.myMapStyle}>

           <Text> THIS SHOULD BE MY MAP </Text>
        {userCoordinates ? ( <View style={styles.containerMap}>
   <MapView
    // showsUserLocation={true} this is to show the gps point where we are at the moment
      style={styles.map}
      region={{
        latitude: userCoordinates?.[0].latitude,
        longitude: userCoordinates?.[0].longitude,
        latitudeDelta: 0.0115,
        longitudeDelta: 0.0121,
      }}
    >
      <Polyline 
      coordinates={userCoordinates}
      strokeColor='#F1600D'
      fillColor='#F1600D'
      strokeWidth={8}
      />
    </MapView>
  </View>) : (<Text>No coordinates</Text>)}  

          </TouchableOpacity>
        ) : null}
      </View>
      <View
        style={{
          height: opponentLayoutHeight,
          overflow: 'hidden',
        }}>
        {otherTime ? (
          <TouchableOpacity key={key} style={styles.opponentMapStyle}>
            <Text> OPPONENT MAP HERE </Text>

        {opponentCoordinates ? ( <View style={styles.containerMap}>
   <MapView
     // showsUserLocation={true} this is to show the gps point where we are at the moment
      style={styles.map}
      region={{
        latitude: opponentCoordinates?.[0].latitude,
        longitude: opponentCoordinates?.[0].longitude,
        latitudeDelta: 0.0115,
        longitudeDelta: 0.0121,
      }}
    >
      <Polyline 
      coordinates={opponentCoordinates}
      strokeColor='#F1600D'
      fillColor='#F1600D'
      strokeWidth={8}
      />
    </MapView>
  </View>) : (<Text>No coordinates</Text>)} 

          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerMap: {
    display: 'flex',
    //   ...StyleSheet.absoluteFillObject,
    height: 275,
    width: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
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
    borderTopColor: '#50A5B1',
    borderTopWidth: 0.5,
  },
  headerText: {
    fontSize: 25,
    fontWeight: '500',
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
  myMapStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#50A5B130',
  },
  opponentMapStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#50A5B130',
  },

  date: {
    textAlign: 'right',
    fontSize: 12,
  },

  timeKm: {
    fontSize: 19,
  },

  // time and distance labels:

  colorBlue: {
    color: '#50A5B1',
  },

  fillBlue: {
    borderColor: '#50A5B1',
    borderWidth: 2,
    borderRadius: 7,
    backgroundColor: '#50A5B1',
  },

  borderBlue: {
    borderColor: '#50A5B1',
    borderWidth: 2,
    borderRadius: 7,
  },

  colorWhite: {
    color: 'white',
  },

  colorOrange: {
    color: '#F1600D',
  },

  buttonDecline: {
    marginTop: 2,
    backgroundColor: 'transparent',
    padding: 7,
    borderColor: '#F1600D',
    borderWidth: 2,
    borderRadius: 7,
  },

  buttonAccept: {
    marginTop: 2,
    backgroundColor: 'transparent',
    padding: 7,
    borderColor: '#50A5B1',
    borderWidth: 2,
    borderRadius: 7,
  },

  colorWhite: {
    color: 'white',
  },

  rejected: {
    fontSize: 18,
    color: '#F1600D',
  },
});
