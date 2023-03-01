import React from 'react';
import {HStack, VStack} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, Text} from 'react-native';

export default function timerItem({byTime, timer}) {
  const formatTime = timer => {
    const hours = Math.floor(timer / 120);
    const minutes = Math.floor(timer / 60);
    const remainingSeconds = timer % 60;
    const hoursStr = String(hours).padStart(1, '0');
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(remainingSeconds).padStart(2, '0');
    return `${hoursStr}:${minutesStr}:${secondsStr}`;
  };

  return (
    <HStack
      style={byTime ? styles.containerBig : styles.containerSmall}
      justifyContent="space-between"
      mx="auto">
      <VStack style={{flex: 1}}>
        <MaterialCommunityIcons
          name="timer-outline"
          size={byTime ? 50 : 50}
          style={byTime ? styles.colorWhite : styles.colorBlue}
        />
      </VStack>
      <VStack style={{flex: 3}} alignItems="center">
        <Text style={byTime ? styles.textColorWhite : styles.textColorBlue}>
          {formatTime(timer)}
        </Text>
      </VStack>
      <VStack style={{flex: 1}}></VStack>
    </HStack>
  );
}

const styles = StyleSheet.create({
  containerBig: {
    space: 5,
    paddingHorizontal: 3,
    paddingVertical: 1,
    marginHorizontal: 10,
    marginTop: 10,
    alignItems: 'center',
    borderColor: '#50A5B1',
    borderWidth: 2,
    borderTopEndRadius: 7,
    borderTopStartRadius: 7,
    backgroundColor: '#50A5B1',
    width: '95%',
  },

  containerSmall: {
    paddingHorizontal: 3,
    paddingVertical: 1,
    marginVertical: 10,
    alignItems: 'center',
    borderColor: '#50A5B1',
    borderWidth: 2,
    borderRadius: 7,
    width: '95%',
  },

  colorBlue: {
    color: '#50A5B1',
  },

  colorWhite: {
    color: 'white',
  },

  textColorBlue: {
    fontSize: 50,
    color: '#50A5B1',
  },

  textColorWhite: {
    fontSize: 50,
    color: 'white',
  },
});
