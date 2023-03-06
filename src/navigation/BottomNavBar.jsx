// Screens
import Home from '../screens/home/Home';
import FirebaseDatabase from '../screens/home/Profile';
import Map from '../screens/home/Map';
import Search from '../screens/home/Search';
import Leaderboard from '../screens/home/Leaderboard';
import {
  VStack,
  Input,
  NativeBaseProvider,
  Button,
  Text,
  View,
  Box,
} from 'native-base';
import {Alert} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// take the icons from https://oblador.github.io/react-native-vector-icons/

// screen names
const homeName = 'Challenges';
const firebase = 'Profile';
const map = 'Map';
const search = 'Search';
const chart = 'Leaderboard';

export default function BottomNavBar({user}) {
  const Tab = createBottomTabNavigator();

  const createTwoButtonAlert = () =>
    Alert.alert(
      'Instructions',
      'You can see the challenges you sent, received or finished in this screen.\nThe sword appears if you were the one to initiate the challenge, if you received the challenge you will see a shield.\nThe time or distance indicators will be colored blue, white or absent depending on the challenge type.\nIf you decline a challenge request, you will lose a challenge and your opponent will gain one.',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
    );

  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({route}) => ({
        headerTintColor: '#FEF6ED',
        headerStyle: {
          backgroundColor: '#50A5B1',
        },
        // headerShown: false, // this can remove the header on top of each screen
        tabBarActiveTintColor: '#50A5B1',
        tabBarInactiveTintColor: '#1A265A',
        tabBarStyle: '#50A5B1',
        tabBarShowLabel: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === firebase) {
            iconName = focused ? 'person' : 'person-outline';
          } else if (rn === map) {
            iconName = focused ? 'map' : 'map-outline';
          } else if (rn === chart) {
            iconName = focused ? 'trophy' : 'trophy-outline';
          } else if (rn === search) {
            iconName = focused ? 'search' : 'search-outline';
          }
          return <Ionicons name={iconName} size={30} color="#F1600D" />;
        },
      })}>
      <Tab.Screen
        name={homeName}
        user={user}
        component={Home}
        options={{
          headerRight: () => (
            <Box m="2">
              <Ionicons
                name="information-circle-outline"
                size={30}
                onPress={createTwoButtonAlert}
                title="Info"
                color="#fff"
              />
            </Box>
          ),
        }}
      />

      <Tab.Screen name={search} user={user} component={Search} />
      <Tab.Screen name={map} user={user} component={Map} />
      <Tab.Screen name={chart} component={Leaderboard} />
      <Tab.Screen name={firebase} user={user} component={FirebaseDatabase} />
    </Tab.Navigator>
  );
}
