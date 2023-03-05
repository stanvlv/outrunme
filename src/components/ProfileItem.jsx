import React from 'react';
import {
  NativeBaseProvider,
  Box,
  Text,
  Image,
} from 'native-base';
import {SafeAreaView} from 'react-native';


export default function ProfileItem({
  username,
  runs,
  challenges_won,
  challenges_lost,
}) {
  return (
    <NativeBaseProvider>
      <SafeAreaView style={{margin: 10}}>
        <Box style={{padding: 20}}>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 30,
            }}>
            <Image
              size={100}
              borderRadius={50}
              source={{uri: 'https://wallpaperaccess.com/full/317501.jpg'}}
              alt="Avatar"
            />

            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{username}</Text>
          </Box>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 25,
            }}>
            <Box style={{flex: 1, marginRight: 20}}>
              <Box style={{marginBottom: 10}}>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: '#1A265A'}}>
                  Runs
                </Text>
              </Box>
              <Box>
                <Text style={{fontSize: 16, color: '#F1600D'}}>{runs}</Text>
              </Box>
            </Box>
            <Box style={{flex: 1, marginRight: 20}}>
              <Box style={{marginBottom: 10}}>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: '#1A265A'}}>
                  Wins
                </Text>
              </Box>
              <Box>
                <Text style={{fontSize: 16, color: '#F1600D'}}>
                  {challenges_won}
                </Text>
              </Box>
            </Box>
            <Box style={{flex: 1}}>
              <Box style={{marginBottom: 10}}>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: '#1A265A'}}>
                  Losses
                </Text>
              </Box>
              <Box>
                <Text style={{fontSize: 16, color: '#F1600D'}}>
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
              margin: 10,
            }}></Text>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 25,
            }}>
            <Box style={{flex: 1, marginRight: 20}}>
              <Box style={{marginBottom: 10}}>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: '#1A265A'}}>
                  Rank
                </Text>
              </Box>
              <Box>
                <Text style={{fontSize: 16, color: '#F1600D'}}>{runs}</Text>
              </Box>
            </Box>
            <Box style={{flex: 1, marginRight: 20}}>
              <Box style={{marginBottom: 10}}>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: '#1A265A'}}>
                  KM ran
                </Text>
              </Box>
              <Box>
                <Text style={{fontSize: 16, color: '#F1600D'}}>
                  {challenges_won}
                </Text>
              </Box>
            </Box>
            <Box style={{flex: 1}}>
              <Box style={{marginBottom: 10}}>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: '#1A265A'}}>
                  Hours ran
                </Text>
              </Box>
              <Box>
                <Text style={{fontSize: 16, color: '#F1600D'}}>
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
              margin: 10,
            }}></Text>
        </Box>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
