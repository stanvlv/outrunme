import React from 'react';
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {
  VStack,
  HStack,
  Text,
} from 'native-base';
import { styles } from '../styles/Style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ChallengeItemFinished({userData}) {
  return (
    <VStack>
      <HStack>
        <VStack alignItems="center" my="1" style={{flex: 2}}>
          <Text style={styles.headerTextChallengeItemFinished} py="2">
            {userData}
          </Text>
          <HStack
            px="0.5"
            my="3"
            alignItems="center"
            style={byTime ? styles.fillBlueChallengeItemFinished : styles.borderBlueChallengeItemFinished}>
            <MaterialCommunityIcons
              name="timer-outline"
              size={30}
              style={byTime ? styles.colorWhiteChallengeItemFinished : styles.colorBlueChallengeItemFinished}
            />
            <Text px="1" style={byTime ? styles.colorWhiteChallengeItemFinished : styles.colorBlueChallengeItemFinished}>
              {convUserTime}
            </Text>
          </HStack>
          <HStack
            alignItems="center"
            style={byTime ? styles.borderBlueChallengeItemFinished : styles.fillBlueChallengeItemFinished}>
            <MaterialCommunityIcons
              name="map-marker-distance"
              size={30}
              style={byTime ? styles.colorBlueChallengeItemFinished : styles.colorWhiteChallengeItemFinished}
            />
            <Text px="1" style={byTime ? styles.colorBlueChallengeItemFinished : styles.colorWhiteChallengeItemFinished}>
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
          <Text style={styles.headerTextChallengeItemFinished} py="2">
            {nameTile}
          </Text>
          <HStack
            px="0.5"
            my="3"
            alignItems="center"
            style={byTime ? styles.fillBlueChallengeItemFinished : styles.borderBlueChallengeItemFinished}>
            <MaterialCommunityIcons
              name="timer-outline"
              size={30}
              style={byTime ? styles.colorWhiteChallengeItemFinished : styles.colorBlueChallengeItemFinished}
            />
            <Text px="1" style={byTime ? styles.colorWhiteChallengeItemFinished : styles.colorBlueChallengeItemFinished}>
              {RunTime}
            </Text>
          </HStack>
          <HStack
            alignItems="center"
            style={byTime ? styles.borderBlueChallengeItemFinished : styles.fillBlueChallengeItemFinished}>
            <MaterialCommunityIcons
              name="map-marker-distance"
              size={30}
              style={byTime ? styles.colorBlueChallengeItemFinished : styles.colorWhiteChallengeItemFinished}
            />
            <Text px="1" style={byTime ? styles.colorBlueChallengeItemFinished : styles.colorWhiteChallengeItemFinished}>
              {convOtherKm}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
}