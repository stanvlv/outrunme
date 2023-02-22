import {Box, Button, NativeBaseProvider} from 'native-base';

export default function Map({navigation}) {
  return (
    <NativeBaseProvider>
      <Box>Map</Box>
      <Box>Distance:</Box>
      <Box>Time:</Box>
      <Button>Start Run</Button>
    </NativeBaseProvider>
  );
}
