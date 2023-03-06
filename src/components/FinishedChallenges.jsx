import React, {useEffect, useState} from 'react';
import MapView, {Polyline} from 'react-native-maps';
import {View, TouchableOpacity} from 'react-native';
import {styles} from '../styles/Style';
import {VStack, HStack, Text} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FinishedChallenges({
  item,
  userTime,
  userKm,
  otherTime,
  otherKm,
  nameTile,
  selectedTab,
  userData,
  sent,
  byTime,
  winner,
  userCoordinates,
  opponentCoordinates,
}) {
  const [myLayoutHeight, setMyLayoutHeight] = useState(0);
  const [opponentLayoutHeight, setOpponentLayoutHeight] = useState(0);
  const [opponentMapClick, setOpponentMapClick] = useState(false);
  const [myMapClick, setMyMapClick] = useState(false);

  const clickOpponentMap = () => {
    if (myMapClick) {
      setMyMapClick(!myMapClick);
    }
    setOpponentMapClick(!opponentMapClick);
  };
  const clickMyMap = () => {
    if (opponentMapClick) {
      setOpponentMapClick(!opponentMapClick);
    }

    setMyMapClick(!myMapClick);
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

  // Date conversion
  const date = new Date(item.challenged_date);

  const convertDateDay = time => {
    const dt = new Date(time);
    const day = '0' + dt.getDate();
    const month = '0' + (dt.getMonth() + 1);
    const year = dt.getFullYear();
    return day.slice(-2) + '/' + month.slice(-2) + '/' + year;
  };

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
  const timestamp = item.challenged_date;
  const formattedDate = date.toLocaleDateString();
  const finalDateTime = convertDateHours(item.challenged_date);
  const dateFinished = convertDateDay(item.challenged_date);
  const RunTime = formatTime(otherTime);

  // Timer conversion
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

  const convUserKm = formatDistance(userKm);
  const convOpponentKm = formatDistance(otherKm);

  return (
    <View style={styles.headerFinishedChallenges}>
      {selectedTab === 'finished' && (
        <HStack>
          <VStack alignItems="center" my="1" style={{flex: 3}}>
            <TouchableOpacity onPress={clickMyMap} activeOpacity={0.8}>
              <Text style={styles.headerTextFinishedChallenges} py="2">
                {userData}
              </Text>
              <HStack
                px="0.5"
                my="3"
                mx="auto"
                alignItems="center"
                style={
                  byTime
                    ? styles.fillBlueFinishedChallenges
                    : styles.borderBlueFinishedChallenges
                }>
                <MaterialCommunityIcons
                  name="timer-outline"
                  size={30}
                  style={
                    byTime
                      ? styles.colorWhiteFinishedChallenges
                      : styles.colorBlueFinishedChallenges
                  }
                />
                <Text
                  px="1"
                  style={
                    byTime
                      ? styles.colorWhiteFinishedChallenges
                      : styles.colorBlueFinishedChallenges
                  }>
                  {convUserTime}
                </Text>
              </HStack>
              <HStack
                alignItems="center"
                mx="auto"
                style={
                  byTime
                    ? styles.borderBlueFinishedChallenges
                    : styles.fillBlueFinishedChallenges
                }>
                <MaterialCommunityIcons
                  name="map-marker-distance"
                  size={30}
                  style={
                    byTime
                      ? styles.colorBlueFinishedChallenges
                      : styles.colorWhiteFinishedChallenges
                  }
                />
                <Text
                  px="1"
                  style={
                    byTime
                      ? styles.colorBlueFinishedChallenges
                      : styles.colorWhiteFinishedChallenges
                  }>
                  {convUserKm}
                </Text>
              </HStack>
            </TouchableOpacity>
          </VStack>
          <VStack
            style={{flex: 2}}
            flexBasis={1}
            alignItems="center"
            justifyContent="space-between">
            <HStack></HStack>
            <HStack>
              {sent ? (
                <MaterialCommunityIcons
                  name="sword-cross"
                  size={60}
                  style={winner ? {color: 'green'} : {color: '#FF0000'}}
                />
              ) : (
                <MaterialCommunityIcons
                  name="shield-sword"
                  size={60}
                  style={winner ? {color: 'green'} : {color: '#FF0000'}}
                />
              )}
            </HStack>
            <HStack>
              <Text>{dateFinished}</Text>
            </HStack>
          </VStack>
          <VStack alignItems="center" my="1" flexBasis={3} style={{flex: 3}}>
            <TouchableOpacity onPress={clickOpponentMap}>
              <HStack>
                <Text style={styles.headerTextFinishedChallenges} py="2">
                  {nameTile}
                </Text>
              </HStack>
              <HStack
                px="0.5"
                my="3"
                mx="auto"
                alignItems="center"
                style={
                  byTime
                    ? styles.fillBlueFinishedChallenges
                    : styles.borderBlueFinishedChallenges
                }>
                <MaterialCommunityIcons
                  name="timer-outline"
                  size={30}
                  style={
                    byTime
                      ? styles.colorWhiteFinishedChallenges
                      : styles.colorBlueFinishedChallenges
                  }
                />
                <Text
                  px="1"
                  style={
                    byTime
                      ? styles.colorWhiteFinishedChallenges
                      : styles.colorBlueFinishedChallenges
                  }>
                  {RunTime}
                </Text>
              </HStack>
              <HStack
                alignItems="center"
                mx="auto"
                style={
                  byTime
                    ? styles.borderBlueFinishedChallenges
                    : styles.fillBlueFinishedChallenges
                }>
                <MaterialCommunityIcons
                  name="map-marker-distance"
                  size={30}
                  style={
                    byTime
                      ? styles.colorBlueFinishedChallenges
                      : styles.colorWhiteFinishedChallenges
                  }
                />
                <Text
                  px="1"
                  style={
                    byTime
                      ? styles.colorBlueFinishedChallenges
                      : styles.colorWhiteFinishedChallenges
                  }>
                  {convOpponentKm}
                </Text>
              </HStack>
            </TouchableOpacity>
          </VStack>
        </HStack>
      )}

      <View
        style={{
          height: myLayoutHeight,
          overflow: 'hidden',
        }}>
        {userTime ? (
          <TouchableOpacity style={styles.myMapStyleFinishedChallenges}>
            <Text>{userData}`s run map:</Text>
            {userCoordinates.length ? (
              <View style={styles.containerMapFinishedChallenges}>
                <MapView
                  // showsUserLocation={true} this is to show the gps point where we are at the moment
                  style={styles.mapFinishedChallenges}
                  region={{
                    latitude: userCoordinates?.[0].latitude,
                    longitude: userCoordinates?.[0].longitude,
                    latitudeDelta: 0.0115,
                    longitudeDelta: 0.0121,
                  }}>
                  <Polyline
                    coordinates={userCoordinates}
                    strokeColor="#F1600D"
                    fillColor="#F1600D"
                    strokeWidth={8}
                  />
                </MapView>
              </View>
            ) : (
              <Text>No coordinates</Text>
            )}
          </TouchableOpacity>
        ) : null}
      </View>
      <View
        style={{
          height: opponentLayoutHeight,
          overflow: 'hidden',
        }}>
        {otherTime ? (
          <TouchableOpacity style={styles.opponentMapStyleFinishedChallenges}>
            <Text>{nameTile}`s run map:</Text>
            {opponentCoordinates.length ? (
              <View style={styles.containerMapFinishedChallenges}>
                <MapView
                  // showsUserLocation={true} this is to show the gps point where we are at the moment
                  style={styles.mapFinishedChallenges}
                  region={{
                    latitude: opponentCoordinates?.[0].latitude,
                    longitude: opponentCoordinates?.[0].longitude,
                    latitudeDelta: 0.0115,
                    longitudeDelta: 0.0121,
                  }}>
                  <Polyline
                    coordinates={opponentCoordinates}
                    strokeColor="#F1600D"
                    fillColor="#F1600D"
                    strokeWidth={8}
                  />
                </MapView>
              </View>
            ) : (
              <Text>No coordinates</Text>
            )}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}
