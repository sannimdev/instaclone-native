import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from '../screen/Feed';
import Search from '../screen/Search';
import Notifications from '../screen/Notifications';
import Profile from '../screen/Profile';

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
                component={Feed}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name="home" color={color} size={focused ? 24 : 20} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name="search" color={color} size={focused ? 24 : 20} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ? 'heart' : 'heart-outline'} color={color} size={focused ? 24 : 20} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name="person" color={color} size={focused ? 24 : 20} />
                    ),
                }}
            />
        </Tabs.Navigator>
    );
}
