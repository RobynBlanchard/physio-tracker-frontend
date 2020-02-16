import Router from 'next/router';
import Link from 'next/link';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Layout } from '../components';
import { useAuth } from '../context/authentication';
import useForm from '../util/useForm';

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

function SignIn() {
  const [signIn, signInResponse] = useMutation(SIGN_IN);
  const { login, user } = useAuth();

  // move login logic to authentication?

  const signInUser = () => {
    console.log('sign in ')
    return signIn({
      variables: {
        data: {
          email: inputs.email,
          password: inputs.password
        }
      }
    });
  };
  const { inputs, handleInputChange, handleSubmit } = useForm(
    { email: '', password: '' },
    signInUser
  );

  // without !user || !user.token - get max depth exceeded error
  if (signInResponse.data && (!user || !user.token)) {
    const token = signInResponse.data.login.token;
    if (token) {
      const email = null;
      const name = signInResponse.data.login.user.name;

      login(token, name, email);
    }
  }

  if (signInResponse.data && user && user.token) {
    Router.push('/account');
  }

  return (
    <Layout title={'Sign in'}>
      <form onSubmit={handleSubmit}>
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
        <div>{signInResponse.error && signInResponse.error.message}</div>

        <input type="submit" value="Sign in" />
      </form>
      <div>
        <p>Not got an account?</p>
        <Link href="/register">
          <a>Create one</a>
        </Link>
      </div>
      <style jsx>{``}</style>
    </Layout>
  );
}

export default SignIn;
