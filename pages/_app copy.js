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
import authClient from '../util/auth-client';
import withData from '../util/apollo-client';
// import { AuthProvider } from '../context/authentication';

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER':
      authClient.register(action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.name,
        token: action.payload.token
      };

    default:
      return state;
  }
};

function MyApp(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { Component, pageProps, apollo } = props;
  // React.useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem('user') || null);
  //   const token = JSON.parse(localStorage.getItem('token') || null);

  //   if (user && token) {
  //     dispatch({
  //       type: 'LOGIN',
  //       payload: {
  //         user,
  //         token
  //       }
  //     });
  //   }
  // }, []);
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <ApolloProvider client={apollo}>
        {/* <Header /> */}
        {/* <div className="App">
          {!state.isAuthenticated ? <Login /> : <Home />}
        </div> */}
        <Component {...pageProps} />
      </ApolloProvider>
    </AuthContext.Provider>
  );
}

// class MyApp extends App {
//   render() {
//     const { Component, pageProps, apollo } = this.props;
//     return (
//       <ApolloProvider client={apollo}>
//         <AuthProvider>
//           <Component {...pageProps} />
//         </AuthProvider>
//       </ApolloProvider>
//     );
//   }
// }

// // Wraps all components in the tree with the data provider
export default withData(MyApp);
