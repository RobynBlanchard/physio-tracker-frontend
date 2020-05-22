import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import fetch from 'isomorphic-unfetch';
import Cookies from 'js-cookie';
import { devGraphQlEndpoint, prodGraphQlEndpoint } from '../config/endpoints';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (typeof window === 'undefined') {
  global.fetch = fetch;
}

function create(initialState, { authToken, fetchOptions }) {
  const httpLink = createHttpLink({
    // uri: 'https://radiant-harbor-05701.herokuapp.com/',
    uri:
      process.env.NODE_ENV === 'production'
        ? prodGraphQlEndpoint
        : devGraphQlEndpoint,
    fetchOptions,
  });

  const isBrowser = typeof window !== 'undefined';

  console.log('init apollo');

  const authLink = setContext((_, { headers }) => {
    let token;
    if (isBrowser) {
      token = Cookies.get('authToken');
    } else {
      token = authToken;
    }
    console.log('init apollo 2');

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    credentials: 'include',
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default function initApollo(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    let fetchOptions = {};

    // If you are using a https_proxy, add fetchOptions with 'https-proxy-agent' agent instance
    // 'https-proxy-agent' is required here because it's a sever-side only module
    if (process.env.https_proxy) {
      fetchOptions = {
        agent: new (require('https-proxy-agent'))(process.env.https_proxy),
      };
    }

    return create(initialState, {
      ...options,
      fetchOptions,
    });
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
