import { ApolloClient, createHttpLink, makeVar } from '@apollo/client';
import { InMemoryCache } from '@apollo/client/cache';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setContext } from '@apollo/client/link/context';
import { offsetLimitPagination } from '@apollo/client/utilities';

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar('');
const TOKEN = 'token';

export const logUserIn = async (token) => {
    await AsyncStorage.setItem(TOKEN, token);
    isLoggedInVar(true);
    tokenVar(token);
};

export const logUserOut = async () => {
    await AsyncStorage.removeItem(TOKEN);
    isLoggedInVar(false);
    tokenVar(null);
};

const httpLink = createHttpLink({
    uri: 'http://01cd-220-78-126-60.ngrok.io/graphql',
    credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            token: tokenVar(),
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    seeFeed: offsetLimitPagination(),
                },
            },
        },
    }),
});

export default client;
