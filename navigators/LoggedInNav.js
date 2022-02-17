import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import TabIcon from '../components/nav/TabIcon';
import SharedStackNav from './SharedStackNav';

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
                name="FeedRoot"
                options={{
                    tabBarIcon: ({ focused, color /*, size*/ }) => (
                        <TabIcon iconName="home" focused={focused} color={color} />
                    ),
                }}
            >
                {() => <SharedStackNav screenName="Feed" />}
            </Tabs.Screen>
            <Tabs.Screen
                name="SearchRoot"
                options={{
                    tabBarIcon: ({ focused, color /*, size*/ }) => (
                        <TabIcon iconName="search" focused={focused} color={color} />
                    ),
                }}
            >
                {() => <SharedStackNav screenName="Search" />}
            </Tabs.Screen>
            <Tabs.Screen
                name="CameraRoot"
                component={View}
                options={{
                    tabBarIcon: ({ focused, color /*, size*/ }) => (
                        <TabIcon iconName="camera" focused={focused} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="NotificationsRoot"
                options={{
                    tabBarIcon: ({ focused, color /*, size*/ }) => (
                        <TabIcon iconName="heart" focused={focused} color={color} />
                    ),
                }}
            >
                {() => <SharedStackNav screenName="Notifications" />}
            </Tabs.Screen>
            <Tabs.Screen
                name="MeRoot"
                options={{
                    tabBarIcon: ({ focused, color /*, size*/ }) => (
                        <TabIcon iconName="person" focused={focused} color={color} />
                    ),
                }}
            >
                {() => <SharedStackNav screenName="Me" />}
            </Tabs.Screen>
        </Tabs.Navigator>
    );
}
