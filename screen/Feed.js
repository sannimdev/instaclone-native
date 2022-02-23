import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { FlatList } from 'react-native';
import Photo from '../components/Photo';
import ScreenLayout from '../components/ScreenLayout';
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from '../fragments';

const FEED_QUERY = gql`
    query seeFeed($offset: Int!) {
        seeFeed(offset: $offset) {
            ...PhotoFragment
            user {
                username
                avatar
            }
            caption
            comments {
                ...CommentFragment
            }
            createdAt
            isMine
        }
    }
    ${PHOTO_FRAGMENT}
    ${COMMENT_FRAGMENT}
`;

export default function Feed({ navigation }) {
    const result = useQuery(FEED_QUERY, { variables: { offset: 0 } });
    const { loading, data, refetch, fetchMore } = result;

    const renderPhoto = ({ item: photo }) => {
        return <Photo {...photo} />;
    };

    const refresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    const [refreshing, setRefreshing] = useState(false);
    return (
        <ScreenLayout loading={loading}>
            <FlatList
                onEndReachedThreshold={0.02}
                onEndReached={() =>
                    fetchMore({
                        variables: { offset: data?.seeFeed?.length },
                    })
                }
                refreshing={refreshing}
                onRefresh={refresh}
                style={{ width: '100%' }}
                showsVerticalScrollIndicator={false}
                data={data?.seeFeed}
                keyExtractor={(photo) => photo.id + ''}
                renderItem={renderPhoto}
            />
        </ScreenLayout>
    );
}
