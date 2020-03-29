import Router from 'next/router';
import Link from 'next/link';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Layout, Button, FormInput, ErrorText } from '../components';
import { useAuth } from '../context/authentication';
import useForm from '../../util/useForm';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  align-items: column;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SecondaryLinkWrapper = styled.div`
  text-align: center;
`;

const SecondaryLinkText = styled.p`
  color: ${({ theme }) => theme.colors.darkGrey};
`;

const SecondaryLink = styled.a`
  color: ${({ theme }) => theme.colors.secondary};
  text-decoration: underline;
  cursor: pointer;
`;

const InputContainer = styled.div`
  width: 80%;
  text-align: left;
  margin-bottom: 10px;
`;

const ProfileWrapper = styled.div`
  text-align: center;
  margin: 50px;
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

function SignIn() {
  const [signIn, signInResponse] = useMutation(SIGN_IN);
  const { login, user } = useAuth();

  const signInUser = () => {
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
    <Layout title={'Sign in'} backgroundID={5}>
      <ProfileWrapper>
        <img src="/images/account.png" />
      </ProfileWrapper>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <FormInput
            name="email"
            type="email"
            onChange={handleInputChange}
            value={inputs.email}
            label="Email"
            required
          />
        </InputContainer>

        <InputContainer>
          <FormInput
            name="password"
            type="password"
            onChange={handleInputChange}
            value={inputs.password}
            label="Password"
            required
            minLength="8"
          />
        </InputContainer>
        <ErrorText>{signInResponse.error && signInResponse.error.message}</ErrorText>

        <Button type="submit" value="Sign in">
          Sign in
        </Button>
      </Form>
      <SecondaryLinkWrapper>
        <SecondaryLinkText>
          Don't have an account?{' '}
          <Link href="/register">
            <SecondaryLink>Register now</SecondaryLink>
          </Link>
        </SecondaryLinkText>
      </SecondaryLinkWrapper>
    </Layout>
  );
}

export default SignIn;
