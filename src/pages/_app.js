/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import Head from 'next/head';
import withData from '../api/apollo-client';
import { AuthProvider } from '../context/authentication';

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    const { resetStore } = apolloClient;

    return (
      <>
        <Head>
          <title>Home</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
          />
        </Head>
        <ApolloProvider client={apolloClient}>
          <AuthProvider>
            <Component {...pageProps} resetStore={resetStore} />
          </AuthProvider>
        </ApolloProvider>
      </>
    );
  }
}

export default withData(MyApp);

// TODO
// import React from 'react'
// import {useUser} from './context/auth'
// const AuthenticatedApp = React.lazy(() => import('./authenticated-app'))
// const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))
// function App() {
//   const user = useUser()
//   return user ? <AuthenticatedApp /> : <UnauthenticatedApp />
// }
// export App

// https://github.com/howtographql/howtographql/blob/master/content/frontend/react-apollo/5-authentication.md
// https://medium.com/the-ideal-system/user-accounts-with-next-js-an-extensive-tutorial-6831cdaed16b
