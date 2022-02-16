import { ApolloClient, makeVar } from '@apollo/client';
import { InMemoryCache } from '@apollo/client/cache';

export const isLoggedInVar = makeVar(false);

const client = new ApolloClient({
    uri: 'http://10.1.1.160:4000/graphql',
    cache: new InMemoryCache(),
});

export default client;
