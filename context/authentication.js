// move apollo hooks logic into authClient
// handle returning error

import React from 'react';
import authClient from '../util/auth-client';
// import {FullPageSpinner} from '../components/lib'
const AuthContext = React.createContext();
function AuthProvider(props) {
  const [user, setUser] = React.useState(null);

  const login = (token, name, email) => {
    authClient.register(token, name);
    console.log('log in', token)
    console.log('log in', name)
    return setUser({ token, name });
  }; // make a login request

  const register = (token, name, email) => {
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
      value={{ user, login, logout, register }}
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
