/* eslint-disable react/jsx-props-no-spreading */
// move apollo hooks logic into authClient
// handle returning error

import React from 'react';
import Cookies from 'js-cookie';
import authClient from '../api/auth-client';
// import {FullPageSpinner} from '../components/lib'
const AuthContext = React.createContext();
function AuthProvider(props) {
  const defaultUser = () => {
    const token = Cookies.get('authToken');
    const name = Cookies.get('name');
    return {
      token,
      name,
    };
  };
  const [user, setUser] = React.useState(defaultUser()); // TODO: fetch user token on server and pass down app

  const login = (token, name) => {
    authClient.register(token, name);
    // console.log('log in action');
    return setUser({ token, name });
  };

  const register = (token, name) => {
    authClient.register(token, name);
    return setUser({ token, name });
  };

  const logout = () => {
    authClient.logout();

    // TODO:
    // client.resetStore() - clear apollo client cache
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
      }}
      {...props}
    />
  );
}
const useAuth = () => React.useContext(AuthContext);
export { AuthProvider, useAuth };
// the UserProvider in user-context.js is basically:
// const UserProvider = props => (
//   <UserContext.Provider value={useAuth().data.user} {...props} />
// )
// and the useUser hook is basically this:
// const useUser = () => React.useContext(UserContext)

// export const AuthContext = React.createContext();

// const initialState = {
//   isAuthenticated: false,
//   user: null,
//   token: null
// };
