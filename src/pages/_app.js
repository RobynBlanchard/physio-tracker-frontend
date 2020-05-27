/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import Head from 'next/head';
import { AuthProvider } from '../context/authentication';
import withData from '../api/apollo-client';

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;

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
            <Component {...pageProps} />
          </AuthProvider>
        </ApolloProvider>
      </>
    );
  }
}

export default withData(MyApp);
