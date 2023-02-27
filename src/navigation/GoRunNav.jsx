import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Map from '../screens/home/Map'


const Stack = createStackNavigator()

export default function GoRunNav() {
    return (
        <Stack.Navigator >
            <Stack.Navigator name='pls work' component={}
            <Stack.Screen name='map gorun' component={Map} />

        </Stack.Navigator>
    )
}