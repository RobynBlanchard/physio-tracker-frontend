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
// https://www.apollographql.com/docs/react/networking/authentication/
import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';

import withData from '../util/apollo-client';
import {AuthProvider} from '../context/authentication';
class MyApp extends App {
  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ApolloProvider>
    );
  }
}

// Wraps all components in the tree with the data provider
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