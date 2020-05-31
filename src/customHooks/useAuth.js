/* eslint-disable react/jsx-props-no-spreading */
import Router from 'next/router';
import Cookies from 'js-cookie';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

const ME_QUERY = gql`
  query me {
    me {
      name
    }
  }
`;

const SIGN_IN = gql`
  mutation login($data: LoginUserInput!) {
    login(data: $data) {
      user {
        id
        name
      }
      token
    }
  }
`;

const CREATE_USER = gql`
  mutation createUser($data: CreateUserInput) {
    createUser(data: $data) {
      user {
        id
        name
      }
      token
    }
  }
`;

const AuthContext = React.createContext();

const AUTH_TOKEN = 'authToken';
function AuthProvider(props) {
  const { loading, data, refetch, client } = useQuery(ME_QUERY);
  const [signIn, signInResponse] = useMutation(SIGN_IN);
  const [addUser, registerResponse] = useMutation(CREATE_USER);

  const signin = (email, password) => {
    return signIn({ variables: { data: { email, password } } }).then((res) => {
      if (res && res.data && res.data.login && res.data.login.token) {
        const { token } = res.data.login;
        Cookies.set(AUTH_TOKEN, token);
        // refetch();
      } else {
        throw Error('No token returned');
      }
      return res;
    });
  };

  const register = (name, email, password) => {
    return addUser({ variables: { data: { name, email, password } } }).then(
      (res) => {
        if (
          res &&
          res.data &&
          res.data.createUser &&
          res.data.createUser.token
        ) {
          const { token } = res.data.createUser;
          Cookies.set(AUTH_TOKEN, token);
        } else {
          throw Error('No token returned');
        }
        return res;
      }
    );
  };

  const logout = () => {
    client.resetStore();
    Cookies.remove(AUTH_TOKEN);
    Router.push('/');
    // TODO fix error thrown after redirect
  };

  return (
    <AuthContext.Provider
      value={{
        data,
        signin,
        signInResponse,
        logout,
        register,
        registerResponse,
        refetch,
        client,
      }}
      {...props}
    />
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
