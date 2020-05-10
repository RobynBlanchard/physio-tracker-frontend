import Router from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import { Layout, Button, FormInput, ErrorText } from '../components';
import { useAuth } from '../context/authentication';
import useForm from '../customHooks/useForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const StyledIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.white};
  width: auto !important;
  height: 80px;
`;

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
  /* color: ${({ theme }) => theme.colors.darkGrey}; */
  color: white;
`;

const SecondaryLink = styled.a`
  /* color: ${({ theme }) => theme.colors.secondary}; */
  color: white;
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

function SignIn() {
  const { signin, signInResponse } = useAuth();
  const [signInError, displaySignInError] = useState(false);

  const signInUser = (inputs) =>
    signin(inputs.email, inputs.password)
      .then(() => {
        Router.push('/account');
      })
      .catch(() => displaySignInError(true));

  const { inputs, handleInputChange, handleSubmit } = useForm(
    { email: '', password: '' },
    signInUser
  );

  return (
    <Layout
      title="Sign in"
      isLoading={signInResponse && signInResponse.loading}
    >
      <ProfileWrapper>
        {/* <img src="/images/account.png" alt="profile" /> */}
        <StyledIcon icon="user-circle" />
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
        <ErrorText>{signInError && 'Sorry could not sign in'}</ErrorText>

        <Button type="submit" value="Sign in">
          Sign in
        </Button>
      </Form>
      <SecondaryLinkWrapper>
        <SecondaryLinkText>
          Don&apos;t have an account?&nbsp;
          <Link href="/register">
            <SecondaryLink>Register now</SecondaryLink>
          </Link>
        </SecondaryLinkText>
      </SecondaryLinkWrapper>
    </Layout>
  );
}

export default SignIn;
