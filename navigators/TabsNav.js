import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View } from 'react-native';
import TabIcon from '../components/nav/TabIcon';
import SharedStackNav from './SharedStackNav';
import useMe from '../hook/useMe';

const Tabs = createBottomTabNavigator();

export default function TabsNav() {
    const { data } = useMe();
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
                listeners={({ navigation }) => {
                    return {
                        tabPress: (e) => {
                            e.preventDefault();
                            navigation.navigate('Upload');
                        },
                    };
                }}
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
                    tabBarIcon: ({ focused, color /*, size*/ }) =>
                        data?.me?.avatar ? (
                            <Image
                                source={{ uri: data.me.avatar }}
                                style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 10,
                                    // ...(focused && { borderColor: 'white', borderWidth: 1 }), 안드로이드에서 튕김
                                }}
                            />
                        ) : (
                            <TabIcon iconName="person" focused={focused} color={color} />
                        ),
                }}
            >
                {() => <SharedStackNav screenName="Me" />}
            </Tabs.Screen>
        </Tabs.Navigator>
    );
}
