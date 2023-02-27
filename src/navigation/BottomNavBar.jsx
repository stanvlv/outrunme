// Screens
import Home from '../screens/home/Home';
import Profile from '../screens/home/Profile';
import FindUser from '../screens/home/FindUser';
import Leaderboard from '../screens/home/Leaderboard';


import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// take the icons from https://oblador.github.io/react-native-vector-icons/

// screen names
const homeName = 'Challenges';
const profile = 'Profile';
const findUser = 'Search';
const chart = 'Leaderboard'

export default function BottomNavBar({user}) {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({route}) => ({
        headerTintColor: '#FEF6ED',
        headerStyle: {
          backgroundColor: '#F1600D',
        },
        // headerShown: false, // this can remove the header on top of each screen
        tabBarActiveTintColor: '#F1600D',
        tabBarInactiveTintColor: '#1A265A',
        tabBarStyle: '#FEF6ED',
        
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === profile) {
            iconName = focused ? 'person' : 'person-outline';
          } else if (rn === chart) {
            iconName = focused ? 'trophy' : 'trophy-outline'
          } else if (rn === findUser) {
            iconName = focused ? 'search' : 'search-outline'
          }
          return <Ionicons name={iconName} size={30} color='#F1600D' />;
        },
      })}>
      <Tab.Screen name={homeName} user={user} component={Home} />
      <Tab.Screen name={findUser} user={user} component={FindUser} />
      <Tab.Screen name={chart} component={Leaderboard} />
      <Tab.Screen name={profile} user={user} component={Profile} />
    </Tab.Navigator>
  );
}
