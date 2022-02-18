import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from '../fragments';

const FEED_QUERY = gql`
    query seeFeed {
        seeFeed {
            id
            user {
                username
                avatar
            }
            caption
            createdAt
            isMine
        }
    }
`;

export default function Feed({ navigation }) {
    const result = useQuery(FEED_QUERY);
    const { loading, data } = result;

    const renderPhoto = ({ item: photo }) => {
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ color: 'white' }}>{photo.caption}</Text>
            </View>
        );
    };

    return (
        <ScreenLayout loading={loading}>
            <FlatList data={data?.seeFeed} keyExtractor={(photo) => photo.id + ''} renderItem={renderPhoto} />
        </ScreenLayout>
    );
}
