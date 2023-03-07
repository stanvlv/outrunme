import React from 'react';
import {NativeBaseProvider, Box, Image, HStack, VStack} from 'native-base';
import {SafeAreaView, Text} from 'react-native';

export default function ProfileItem({
  username,
  runs,
  challenges_won,
  challenges_lost,
  totalKm,
  totalTime,
  rank,
}) {
  const formatDistance = distance => {
    const km = Math.floor(distance / 1000); // get km
    const hm = Math.floor((distance - km * 1000) / 100); // get hundreds of meters
    const dm = Math.floor((distance - km * 1000 - hm * 100) / 10); // get tenths of meters

    return `${km} km`;
  };

  const formatTime = timer => {
    const hours = Math.floor(timer / 3600);
    const minutes = Math.floor(timer / 60);
    const remainingSeconds = timer % 60;
    const hoursStr = String(hours);
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(remainingSeconds).padStart(2, '0');
    return `${hoursStr} hours`;
  };

  const convTotalKm = formatDistance(totalKm);
  const convTotalTime = formatTime(totalTime);
  const rejected = runs - challenges_won - challenges_lost;

  return (
    <NativeBaseProvider>
      <SafeAreaView style={{margin: 10}}>
        <Box style={{padding: 20}}>
          <HStack justifyContent="center">
            <VStack space={4}>
              <Image
                size={100}
                borderRadius={50}
                source={{uri: 'https://wallpaperaccess.com/full/317501.jpg'}}
                alt="Avatar"
              />
              <HStack>
                {rank && (
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: 'bold',
                      color: '#F1600D',
                    }}>
                    #{rank}
                  </Text>
                )}
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    marginHorizontal: 8,
                    color: 'black',
                  }}>
                  {username}
                </Text>
              </HStack>
            </VStack>
          </HStack>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 47,
            }}>
            <Box style={{flex: 1, marginRight: 20}}>
              <Box style={{marginBottom: 10}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#1A265A',
                    textAlign: 'center',
                  }}>
                  Runs
                </Text>
              </Box>
              <Box>
                <Text
                  style={{fontSize: 16, color: '#F1600D', textAlign: 'center'}}>
                  {runs}
                </Text>
              </Box>
            </Box>
            <Box style={{flex: 1, marginRight: 20}}>
              <Box style={{marginBottom: 10}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#1A265A',
                    textAlign: 'center',
                  }}>
                  Wins
                </Text>
              </Box>
              <Box>
                <Text
                  style={{fontSize: 16, color: '#F1600D', textAlign: 'center'}}>
                  {challenges_won}
                </Text>
              </Box>
            </Box>
            <Box style={{flex: 1, justifyContent: 'center'}}>
              <Box style={{marginBottom: 10}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#1A265A',
                    textAlign: 'center',
                  }}>
                  Losses
                </Text>
              </Box>
              <Box>
                <Text
                  style={{fontSize: 16, color: '#F1600D', textAlign: 'center'}}>
                  {challenges_lost}
                </Text>
              </Box>
            </Box>
          </Box>
          {/* text to create a seperation line  */}
          <Text
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#F1600D',
            }}></Text>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 47,
            }}>
            <Box style={{flex: 1, marginRight: 20}}>
              <Box style={{marginBottom: 10}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#1A265A',
                    textAlign: 'center',
                  }}>
                  Rejected
                </Text>
              </Box>
              <Box>
                <Text
                  style={{fontSize: 16, color: '#F1600D', textAlign: 'center'}}>
                  {rejected}
                </Text>
              </Box>
            </Box>
            <Box style={{flex: 1, marginRight: 20}}>
              <Box style={{marginBottom: 10}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#1A265A',
                    textAlign: 'center',
                  }}>
                  Time
                </Text>
              </Box>
              <Box>
                <Text
                  style={{fontSize: 16, color: '#F1600D', textAlign: 'center'}}>
                  {convTotalTime}
                </Text>
              </Box>
            </Box>
            <Box style={{flex: 1, justifyContent: 'center'}}>
              <Box style={{marginBottom: 10}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#1A265A',
                    textAlign: 'center',
                  }}>
                  Distance
                </Text>
              </Box>
              <Box>
                <Text
                  style={{fontSize: 16, color: '#F1600D', textAlign: 'center'}}>
                  {convTotalKm}
                </Text>
              </Box>
            </Box>
          </Box>
          <Text
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#F1600D',
              margin: 10,
            }}></Text>
        </Box>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
