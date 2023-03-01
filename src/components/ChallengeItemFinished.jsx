import React from 'react';
import React, {useEffect, useState} from 'react';
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

export default function ChallengeItemFinished() {
  return (
    <VStack>
      <HStack justifyContent="flex-end">
        <Text style={styles.date}>
          {weekDay}
          {finalTime}
        </Text>
      </HStack>
      <HStack>
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
            <Text px="1" style={byTime ? styles.colorWhite : styles.colorBlue}>
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
            <Text px="1" style={byTime ? styles.colorBlue : styles.colorWhite}>
              {convUserKm}
            </Text>
          </HStack>
        </VStack>
        <VStack style={{flex: 1}} alignItems="center" justifyContent="center">
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
            <Text px="1" style={byTime ? styles.colorWhite : styles.colorBlue}>
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
            <Text px="1" style={byTime ? styles.colorBlue : styles.colorWhite}>
              {convOtherKm}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
}

const styles = StyleSheet.create({
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
  content: {
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
