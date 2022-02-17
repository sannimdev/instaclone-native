import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from '../screen/Feed';
import Search from '../screen/Search';
import Notifications from '../screen/Notifications';
import Profile from '../screen/Profile';
import { View } from 'react-native';
import TabIcon from '../components/nav/TabIcon';

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
                    tabBarIcon: ({ focused, color /*, size*/ }) => (
                        <TabIcon iconName="home" focused={focused} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ focused, color /*, size*/ }) => (
                        <TabIcon iconName="search" focused={focused} color={color} />
                    ),
                }}
            />
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
                component={Notifications}
                options={{
                    tabBarIcon: ({ focused, color /*, size*/ }) => (
                        <TabIcon iconName="heart" focused={focused} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused, color /*, size*/ }) => (
                        <TabIcon iconName="person" focused={focused} color={color} />
                    ),
                }}
            />
        </Tabs.Navigator>
    );
}
