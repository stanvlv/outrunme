import React from 'react';
import {NativeBaseProvider, Box} from 'native-base';

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
