/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import Head from 'next/head';

import Cookies from 'js-cookie';
import withData from '../api/apollo-client';
import { AuthProvider } from '../context/authentication';

function MyComponent({ children }) {
  // const { login, user, logout } = useAuth();
  // if (!user || !user.token) {
  //   const token = Cookies.get('authToken');
  //   if (token) {
  //     const name = Cookies.get('name');

  //     console.log('_app, log in');
  //     login(token, name);
  //   }
  // }
  // or pass user prop
  // You can use hooks here
  return <>{children}</>; // The fragment is just illustrational
}

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let userAuthenticated = false;
    // console.log('_app', userAuthenticated);
    const token = Cookies.get('authToken');
    // console.log('_app token', token)
    // console.log('_app token', req)
    // console.log('_app token', ctx.req.cookies)
    // const cookiee = ctx.req ? { cookie: ctx.req.headers.cookie } : undefined;
    // console.log('cookie', cookiee);

    // const { AppToken } = nextCookie(ctx);
    if (token) {
      // TODO: expire token
      // const decodedToken = jwt_decode(AppToken);
      // const isExpired = () => {
      //     if (decodedToken.exp < Date.now() / 1000) {
      //         return true;
      //     } else {
      //         return false;
      //     }
      // };

      // if (ctx.isServer) {
      //     if (!isExpired()) {
      //         userAuthenticated = true;
      //     }
      // }

      // if (!isExpired()) {
      //     userAuthenticated = true;
      // }
      userAuthenticated = true;
    }

    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {},
      userAuthenticated,
    };
  }

  render() {
    const { Component, pageProps, apollo, userAuthenticated } = this.props;
    return (
      <>
        <Head>
          <title>Home</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
          />
        </Head>
        <ApolloProvider client={apollo}>
          <AuthProvider>
            <MyComponent>
              <Component {...pageProps} userAuthenticated={userAuthenticated} />
            </MyComponent>
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
