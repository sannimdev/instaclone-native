import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import LoggedOutNav from './navigators/LoggedOutNav';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider, useReactiveVar } from '@apollo/client';
import client, { isLoggedInVar, tokenVar } from './apollo';
import LoggedInNav from './navigators/LoggedInNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageWrapper, persistCache } from 'apollo3-cache-persist';

export default function App() {
    const [loading, setLoading] = useState(true);
    const isLoggedIn = useReactiveVar(isLoggedInVar); // Rendered more hooks than during the previous render.
    const preloadAssets = () => {
        // 항상 ㅇpromise를 리턴해야 한다.
        const fontsToLoad = [Ionicons.font];
        const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
        const imagesToLoad = [require('./assets/logo.png')];
        const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
        return Promise.all([...fontPromises, ...imagePromises]);
    };
    const onFinish = () => setLoading(false);
    const preload = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            isLoggedInVar(true);
            tokenVar(token);
        }
        await persistCache({
            cache,
            storage: new AsyncStorageWrapper(AsyncStorage),
        });
        return preloadAssets();
    };
    if (loading) {
        return <AppLoading startAsync={preload} onError={console.warn} onFinish={onFinish} />;
    }
    // const subscription = Appearance.addChangeListener(({ colorScheme }) => {
    //     // console.log(colorScheme); 테마 변경 감지
    // });

    return (
        <ApolloProvider client={client}>
            <NavigationContainer>{isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}</NavigationContainer>
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
