import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Layout } from '../components';
import { useAuth } from '../context/authentication';
import useForm from '../util/useForm';

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
function Account() {
  const [addUser, addUserResponse] = useMutation(CREATE_USER);
  const { register, user } = useAuth();
  const createAccount = () => {
    debugger;
    return addUser({
      variables: {
        data: {
          name: inputs.name,
          email: inputs.email,
          password: inputs.password
        }
      }
    });
  };
  const { inputs, handleInputChange, handleSubmit } = useForm(
    { name: '', email: '', password: '' },
    createAccount
  );


  // move to component did mount ???
  // without !user || !user.token - get max depth exceeded error
  if (addUserResponse.data && (!user || !user.token)) {
    const token = addUserResponse.data.createUser.token;
    if (token) {
      const email = null; //TODO
      const name = addUserResponse.data.createUser.user.name;

      register(token, name, email);
    }
  }

  if (addUserResponse.data && user && user.token) {
    Router.push('/');
    // Or redirect to signed in page
    // hello, R
    // sign out
  }

  console.log(user);
  console.log(addUserResponse);

  return (
    <Layout title={'Account'}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleInputChange}
            value={inputs.firstName}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleInputChange}
            value={inputs.email}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password (8 characters minimum):</label>
          <input
            type="password"
            id="password"
            name="password"
            minLength="8"
            onChange={handleInputChange}
            value={inputs.password}
            required
          />
        </div>
        <div>{addUserResponse.error && addUserResponse.error.message}</div>

        <input type="submit" value="Create account" />
      </form>
      <style jsx>{``}</style>
    </Layout>
  );
}

export default Account;
