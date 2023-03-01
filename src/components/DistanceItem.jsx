import React from 'react';
import {HStack, VStack} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, Text} from 'react-native';

export default function DistanceItem({byTime, distance}) {
  const formatDistance = distance => {
    const km = Math.floor(distance / 1000); // get km
    const hm = Math.floor((distance - km * 1000) / 100); // get hundreds of meters
    const dm = Math.floor((distance - km * 1000 - hm * 100) / 10); // get tenths of meters
    return `${km}.${hm}${dm} km`;
  };

  return (
    <HStack
      style={byTime ? styles.containerSmall : styles.containerBig}
      justifyContent="space-between"
      mx="auto">
      <VStack style={{flex: 1}}>
        <MaterialCommunityIcons
          name="map-marker-distance"
          size={byTime ? 30 : 50}
          style={byTime ? styles.colorBlue : styles.colorWhite}
        />
      </VStack>
      <VStack style={{flex: 3}} alignItems="center">
        <Text
          px="1"
          style={byTime ? styles.textColorBlue : styles.textColorWhite}>
          {formatDistance(distance)}
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
    marginHorizontal: 100,
    marginTop: 10,
    alignItems: 'center',
    borderColor: '#50A5B1',
    borderWidth: 2,
    borderRadius: 7,
    backgroundColor: '#50A5B1',
    width: '95%',
  },

  containerSmall: {
    paddingHorizontal: 3,
    paddingVertical: 1,
    marginVertical: 5,
    alignItems: 'center',
    borderColor: '#50A5B1',
    borderWidth: 2,
    borderRadius: 7,
    width: '70%',
  },

  colorBlue: {
    color: '#50A5B1',
  },

  colorWhite: {
    color: 'white',
  },

  textColorBlue: {
    fontSize: 30,
    color: '#50A5B1',
  },

  textColorWhite: {
    fontSize: 50,
    color: 'white',
  },
});
