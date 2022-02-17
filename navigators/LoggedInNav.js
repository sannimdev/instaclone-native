import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from '../screen/Feed';
import Search from '../screen/Search';
import Notifications from '../screen/Notifications';
import Me from '../screen/Me';
import { View } from 'react-native';
import TabIcon from '../components/nav/TabIcon';
import StackNavFactory from '../components/nav/StackNavFactory';

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
    return (
        <Tabs.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: 'black',
                    borderTopColor: 'rgba(255,255,255,0.2)',
                },
                tabBarActiveTintColor: 'white',
            }}
        >
            <Tabs.Screen
                name="Feed"
                options={{
                    tabBarIcon: ({ focused, color /*, size*/ }) => (
                        <TabIcon iconName="home" focused={focused} color={color} />
                    ),
                }}
            >
                {() => <StackNavFactory screenName="Feed" />}
            </Tabs.Screen>
            <Tabs.Screen
                name="Search"
                options={{
                    tabBarIcon: ({ focused, color /*, size*/ }) => (
                        <TabIcon iconName="search" focused={focused} color={color} />
                    ),
                }}
            >
                {() => <StackNavFactory screenName="Search" />}
            </Tabs.Screen>
            <Tabs.Screen
                name="Camera"
                component={View}
                options={{
                    tabBarIcon: ({ focused, color /*, size*/ }) => (
                        <TabIcon iconName="camera" focused={focused} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Notifications"
                options={{
                    tabBarIcon: ({ focused, color /*, size*/ }) => (
                        <TabIcon iconName="heart" focused={focused} color={color} />
                    ),
                }}
            >
                {() => <StackNavFactory screenName="Notifications" />}
            </Tabs.Screen>
            <Tabs.Screen
                name="Me"
                options={{
                    tabBarIcon: ({ focused, color /*, size*/ }) => (
                        <TabIcon iconName="person" focused={focused} color={color} />
                    ),
                }}
            >
                {() => <StackNavFactory screenName="Me" />}
            </Tabs.Screen>
        </Tabs.Navigator>
    );
}
