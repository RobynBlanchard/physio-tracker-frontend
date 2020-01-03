// import App from 'next/app';
// import withApollo from '../util/apollo-client';

// class CustomApp extends App {
//   render() {
//     const { Component, pageProps } = this.props;

//     return (
//       <Component {...pageProps} />
//     );
//   }
// }

// export default withApollo(CustomApp);

// // TODO: userContext - to pass through user id

import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';

import withData from '../util/apollo-client';

class MyApp extends App {
  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }
}

// Wraps all components in the tree with the data provider
export default withData(MyApp);