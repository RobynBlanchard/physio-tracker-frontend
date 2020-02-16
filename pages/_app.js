import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';

import withData from '../util/apollo-client';
import { AuthProvider, useAuth } from '../context/authentication';
class MyApp extends App {
  render() {
    const { Component, pageProps, apollo } = this.props;
    // const { login, user, logout } = useAuth();
    console.log(useAuth)

    console.log(user)
    console.log(login )

    return (
      <ApolloProvider client={apollo}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ApolloProvider>
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
