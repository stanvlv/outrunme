// Screens
import Home from '../screens/home/Home';
import FirebaseDatabase from '../screens/home/Profile';
import Map from '../screens/home/Map';
import FindUser from '../screens/home/FindUser';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// take the icons from https://oblador.github.io/react-native-vector-icons/

// screen names
const homeName = 'Home';
const firebase = 'Profile';
const map = 'Map';
const findUser = 'FindUser';

export default function BottomNavBar({user}) {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({route}) => ({
        // headerShown: false, // this can remove the header on top of each screen
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === firebase) {
            iconName = focused ? 'person' : 'person-outline';
          } else if (rn === map) {
            iconName = focused ? 'walk' : 'walk-outline';
          }
          return <Ionicons name={iconName} size={30} color={color} />;
        },
      })}>
      <Tab.Screen name={homeName} user={user} component={Home} />
      <Tab.Screen name={firebase} user={user} component={FirebaseDatabase} />
      <Tab.Screen name={map} user={user} component={Map} />
      <Tab.Screen name={findUser} user={user} component={FindUser} />
    </Tab.Navigator>
  );
}
