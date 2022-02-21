import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Photo from '../screen/Photo';
import Profile from '../screen/Profile';
import Feed from '../screen/Feed';
import Search from '../screen/Search';
import Me from '../screen/Me';
import Notifications from '../screen/Notifications';
import { Image } from 'react-native';
import Likes from '../screen/Likes';
import Comments from '../screen/Comments';

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }) {
    return (
        <Stack.Navigator
            headerMode="screen"
            screenOptions={{
                headerBackTitleVisible: false, // 이전 화면 title 보일지 여부
                headerTintColor: 'white',
                headerStyle: {
                    shadowColor: 'rgba(255,255,255,0.8)',
                    backgroundColor: 'black',
                },
            }}
        >
            {screenName === 'Feed' ? (
                <Stack.Screen
                    name="Feed"
                    component={Feed}
                    options={{
                        headerTitle: () => (
                            <Image
                                style={{ maxHeight: 40 }}
                                resizeMode="contain"
                                source={require('../assets/logo.png')}
                            />
                        ),
                    }}
                />
            ) : null}
            {screenName === 'Search' ? <Stack.Screen name="Search" component={Search} /> : null}
            {screenName === 'Notifications' ? <Stack.Screen name="Notifications" component={Notifications} /> : null}
            {screenName === 'Me' ? <Stack.Screen name="Me" component={Me} /> : null}
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Photo" component={Photo} />
            <Stack.Screen name="Likes" component={Likes} />
            <Stack.Screen name="Comments" component={Comments} />
        </Stack.Navigator>
    );
}
