import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import DismissKeyboard from '../components/DismissKeybord';

const SEARCH_PHOTOS = gql`
    query searchPhotos($keyword: String!) {
        searchPhotos(keyword: $keyword) {
            id
            file
        }
    }
`;

const Input = styled.TextInput``;

export default function Search({ navigation }) {
    const { setValue, register, watch } = useForm();
    const [startQuery, { loading, data }] = useLazyQuery(SEARCH_PHOTOS);

    const SearchBox = () => (
        <TextInput
            style={{ backgroundColor: 'white' }}
            placeholderTextColor="black"
            placeholder="Search photos"
            autoCapitalize="none"
            returnKeyLabel="Search"
            returnKeyType="search"
            autoCorrect={false}
            onChangeText={(text) => setValue('keyword', text)}
        />
    );
    useEffect(() => {
        navigation.setOptions({
            headerTitle: SearchBox,
        });
        register('keyword');
    }, []);
    console.log(watch());
    return (
        <DismissKeyboard>
            <View style={{ backgroundColor: 'black', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Photo')}></TouchableOpacity>
            </View>
        </DismissKeyboard>
    );
}
