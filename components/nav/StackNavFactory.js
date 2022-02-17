import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Photo from '../../screen/Photo';
import Profile from '../../screen/Profile';
import Feed from '../../screen/Feed';
import Search from '../../screen/Search';
import Me from '../../screen/Me';
import Notifications from '../../screen/Notifications';

const Stack = createStackNavigator();

export default function StackNavFactory({ screenName }) {
    return (
        <Stack.Navigator>
            {screenName === 'Feed' ? <Stack.Screen name="Feed" component={Feed} /> : null}
            {screenName === 'Search' ? <Stack.Screen name="Search" component={Search} /> : null}
            {screenName === 'Notifications' ? <Stack.Screen name="Notifications" component={Notifications} /> : null}
            {screenName === 'Me' ? <Stack.Screen name="Me" component={Me} /> : null}
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Photo\" component={Photo} />
        </Stack.Navigator>
    );
}
