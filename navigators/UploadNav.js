import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SelectPhoto from '../screen/SelectPhoto';
import TakePhoto from '../screen/TakePhoto';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function UploadNav() {
    return (
        <Tab.Navigator
            tabBarPosition="bottom"
            tabBarOptions={{
                style: { backgroundColor: 'black' },
                activeTintColor: 'white',
                indicatorStyle: {
                    backgroundColor: 'white',
                    top: 0,
                },
            }}
        >
            <Tab.Screen name="Select">
                {() => (
                    <Stack.Navigator>
                        <Stack.Screen name="Select" component={SelectPhoto} />
                    </Stack.Navigator>
                )}
            </Tab.Screen>
            <Tab.Screen name="Take" component={TakePhoto} />
        </Tab.Navigator>
    );
}
