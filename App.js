import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';

export default function App() {
    const [loading, setLoading] = useState(true);
    const onFinish = () => setLoading(false);
    const preload = () => {
        // 항사 ㅇpromise를 리턴해야 한다.
        const fontsToLoad = [Ionicons.font];
        const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
        console.log(fontPromises);
        return Promise.all([fontPromises]);
    };
    if (loading) {
        return <AppLoading startAsync={preload} onError={console.warn} onFinish={onFinish} />;
    }
    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!!!!</Text>
            <StatusBar style="auto" />
        </View>
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
