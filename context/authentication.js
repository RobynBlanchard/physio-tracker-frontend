import React from 'react';
import authClient from '../util/auth-client';
// import {FullPageSpinner} from '../components/lib'
const AuthContext = React.createContext();
function AuthProvider(props) {
  const [user, setUser] = React.useState(null);

  const login = () => {}; // make a login request
  const register = (token, name, email) => {
    
    authClient.register(token);
    return setUser({token, name});
  }; 
  const logout = () => {}; // clear the token in localStorage and the user data
  // note, I'm not bothering to optimize this `value` with React.useMemo here
  // because this is the top-most component rendered in our app and it will very
  // rarely re-render/cause a performance problem.
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
