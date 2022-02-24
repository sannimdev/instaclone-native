import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, TextInput, ActivityIndicator } from 'react-native';
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

const MessageContainer = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;
const MessageText = styled.Text`
    margin-top: 15px;
    color: white;
    font-weight: 600;
`;

export default function Search({ navigation }) {
    const { setValue, register, watch, handleSubmit } = useForm();
    const [startQueryFn, { loading, data, called }] = useLazyQuery(SEARCH_PHOTOS, {
        variables: { keyword: watch('keyword') },
    });

    const onValid = ({ keyword }) => {
        startQueryFn({
            variables: {
                keyword,
            },
        });
    };

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
            onSubmitEditing={handleSubmit(onValid)}
        />
    );
    useEffect(() => {
        navigation.setOptions({
            headerTitle: SearchBox,
        });
        register('keyword', { required: true, minLength: 3 });
    }, []);
    console.log(watch());
    return (
        <DismissKeyboard>
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                {loading ? (
                    <MessageContainer>
                        <ActivityIndicator size="large" color="white" />
                        <MessageText>Searching...</MessageText>
                    </MessageContainer>
                ) : null}
                {!called ? (
                    <MessageContainer>
                        <MessageText>Search by keyword</MessageText>
                    </MessageContainer>
                ) : null}
                {data?.searchPhotos !== undefined && data?.searchPhotos.length === 0 ? (
                    <MessageContainer>
                        <MessageText>Could not found anything</MessageText>
                    </MessageContainer>
                ) : null}
            </View>
        </DismissKeyboard>
    );
}
