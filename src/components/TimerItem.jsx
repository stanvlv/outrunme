import React from 'react';
import {HStack, VStack} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from 'react-native';
import { styles } from '../styles/Style';

export default function timerItem({byTime, timer}) {
  const formatTime = timer => {
    const hours = Math.floor(timer / 3600);
    const minutes = Math.floor(timer / 60);
    const remainingSeconds = timer % 60;
    const hoursStr = String(hours).padStart(1, '0');
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(remainingSeconds).padStart(2, '0');
    return `${hoursStr}:${minutesStr}:${secondsStr}`;
  };

  return (
    <HStack
      style={byTime ? styles.containerBigTimerItem : styles.containerSmallTimerItem}
      justifyContent="space-between"
      mx="auto">
      <VStack style={{flex: 1}}>
        <MaterialCommunityIcons
          name="timer-outline"
          size={byTime ? 50 : 50}
          style={byTime ? styles.colorWhiteTimerItem : styles.colorBlueTimerItem}
        />
      </VStack>
      <VStack style={{flex: 3}} alignItems="center">
        <Text style={byTime ? styles.textColorWhiteTimerItem : styles.textColorBlueTimerItem}>
          {formatTime(timer)}
        </Text>
      </VStack>
      <VStack style={{flex: 1}}></VStack>
    </HStack>
  );
}
