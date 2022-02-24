import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View, ActivityIndicator, useWindowDimensions, FlatList, Image, TouchableOpacity } from 'react-native';
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

const Input = styled.TextInput`
    background-color: rgba(255, 255, 255, 1);
    width: ${(props) => props.width / 2};
    color: black;
    padding: 5px 10px;
    border-radius: 7px;
`;

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
    const numColumns = 4;
    const { width } = useWindowDimensions();
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
        <Input
            width={width}
            placeholderTextColor="rgba(0, 0, 0, 0.8)"
            placeholder="Search Photos"
            style={{ backgroundColor: 'white' }}
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
    const renderItem = ({ item: photo }) => (
        <TouchableOpacity>
            <Image source={{ uri: photo.file }} style={{ width: width / numColumns, height: 100 }} />
        </TouchableOpacity>
    );
    watch();
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
                ) : (
                    <FlatList
                        numColumns={numColumns}
                        data={data?.searchPhotos}
                        keyExtractor={(photo) => photo.id + ''}
                        renderItem={renderItem}
                    />
                )}
            </View>
        </DismissKeyboard>
    );
}
