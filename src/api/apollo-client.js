import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import withApollo from 'next-with-apollo';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import fetch from 'isomorphic-unfetch';
import Cookies from 'js-cookie';

const GRAPHQL_URL = 'https://lit-inlet-86349.herokuapp.com/';

// const GRAPHQL_URL = 'http://localhost:4000/';

const httpLink = createHttpLink({
  fetch,
  uri: GRAPHQL_URL
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = Cookies.get('authToken');
  console.log('auth link!', token)
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

// Export a HOC from next-with-apollo
// Docs: https://www.npmjs.com/package/next-with-apollo

// const GRAPHQL_URL = 'https://radiant-harbor-05701.herokuapp.com/';

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache().restore(initialState || {})
    })
);
