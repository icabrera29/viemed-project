import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  type NormalizedCacheObject,
} from '@apollo/client';

import {setContext} from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL,
});

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token !== '' ? `${token}` : '',
    },
  };
});

export const client = new ApolloClient<NormalizedCacheObject>({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
