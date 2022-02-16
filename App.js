import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import LoggedOutNav from './navigators/LoggedOutNav';
import { NavigationContainer } from '@react-navigation/native';
import { Appearance } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';

export default function App() {
    const [loading, setLoading] = useState(true);
    const onFinish = () => setLoading(false);
    const preload = () => {
        // 항사 ㅇpromise를 리턴해야 한다.
        const fontsToLoad = [Ionicons.font];
        const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
        const imagesToLoad = [require('./assets/logo.png')];
        const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
        return Promise.all([...fontPromises, ...imagePromises]);
    };
    if (loading) {
        return <AppLoading startAsync={preload} onError={console.warn} onFinish={onFinish} />;
    }
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        console.log(colorScheme);
    });
    return (
        <ApolloProvider client={client}>
            <NavigationContainer>
                <LoggedOutNav />
            </NavigationContainer>
        </ApolloProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
