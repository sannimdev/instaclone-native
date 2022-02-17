import { ApolloClient, makeVar } from '@apollo/client';
import { InMemoryCache } from '@apollo/client/cache';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar('');

export const logUserIn = async (token) => {
    await AsyncStorage.multiSet([
        ////////
        ['token', token],
        ['loggedIn', 'yes'],
    ]);
    isLoggedInVar(true);
    tokenVar(token);
};

const client = new ApolloClient({
    uri: 'http://10.1.1.160:4000/graphql',
    cache: new InMemoryCache(),
});

export default client;
