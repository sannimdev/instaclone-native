import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateAccount from '../screen/CreateAccount';
import LogIn from '../screen/LogIn';
import Welcome from '../screen/Welcome';

const Stack = createNativeStackNavigator();

export default function LoggedOutNav() {
    return (
        // card, modal
        <Stack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerTintColor: 'red',
                headerShown: false,
            }}
        >
            <Stack.Screen name="Welcome" options={{ headerShown: false }} component={Welcome} />
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
        </Stack.Navigator>
    );
}
