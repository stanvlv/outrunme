import React from 'react';
import {NativeBaseProvider, Box, Button} from 'native-base';
import {styles} from '../styles/Style'

export default function ProfileItem({
  username,
  runs,
  challenges_won,
  challenges_lost,
}) {





  return (
    <NativeBaseProvider>
      <Box>Name: {username}</Box>
      <Box>Runs: {runs}</Box>
      <Box>Challenges Won: {challenges_won}</Box>
      <Box>Challenges Lost: {challenges_lost}</Box>
    </NativeBaseProvider>
  );
}
