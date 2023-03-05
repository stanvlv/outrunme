import React from 'react';
import {HStack, VStack} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from 'react-native';
import { styles } from '../styles/Style';

export default function DistanceItem({byTime, distance}) {
  const formatDistance = distance => {
    const km = Math.floor(distance / 1000); // get km
    const hm = Math.floor((distance - km * 1000) / 100); // get hundreds of meters
    const dm = Math.floor((distance - km * 1000 - hm * 100) / 10); // get tenths of meters
    return `${km}.${hm}${dm} km`;
  };

  return (
    <HStack
      style={byTime ? styles.containerSmallDistanceItem : styles.containerBigDistanceItem}
      justifyContent="space-between"
      mx="auto">
      <VStack style={{flex: 1}}>
        <MaterialCommunityIcons
          name="map-marker-distance"
          size={byTime ? 50 : 50}
          style={byTime ? styles.colorBlueDistanceItem : styles.colorWhiteDistanceItem}
        />
      </VStack>
      <VStack style={{flex: 3}} alignItems="center">
        <Text
          px="1"
          style={byTime ? styles.textColorBlueDistanceItem : styles.textColorWhiteDistanceItem}>
          {formatDistance(distance)}
        </Text>
      </VStack>
      <VStack style={{flex: 1}}></VStack>
    </HStack>
  );
}