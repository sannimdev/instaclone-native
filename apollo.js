import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from '@apollo/client/cache';
const client = new ApolloClient({
    uri: 'https://c2b8-220-78-126-60.ngrok.io/graphql',
    cache: new InMemoryCache(),
});

export default client;
