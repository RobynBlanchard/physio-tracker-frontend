import Router from 'next/router';
import styled from 'styled-components';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Layout, FormInput, Button, ErrorText } from '../components';
import useForm from '../customHooks/useForm';
import { useAuth } from '../customHooks/useAuth';
import { media } from '../styles/breakpoints';

export const StyledIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.white};
`;

export const StyledIconSmall = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.white};
  position: absolute;
  bottom: 0;
`;

const Form = styled.form`
  display: flex;
  align-items: column;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: ${({ theme }) => theme.spacing.XL};

  ${media.tablet`
    margin: 40px;
  `}
`;

const InputContainer = styled.div`
  width: 100%;
  text-align: left;
  margin: ${({ theme }) => `${theme.spacing.XS} 0`};

  &:nth-child(3) {
    margin-bottom: ${({ theme }) => theme.spacing.L};
  }
`;

const ProfileWrapper = styled.div`
  text-align: center;
  margin: 50px;
  position: relative;
`;

function Account() {
  const { register, registerResponse } = useAuth();
  const [registerError, displayRegisterError] = useState(false);

  const createAccount = (inputs) =>
    register(inputs.name, inputs.email, inputs.password)
      .then(() => {
        Router.push('/account');
      })
      .catch(() => displayRegisterError(true));

  const { inputs, handleInputChange, handleSubmit } = useForm(
    { name: '', email: '', password: '' },
    createAccount
  );

  return (
    <Layout
      title="Register"
      isLoading={registerResponse && registerResponse.loading}
    >
      <ProfileWrapper>
        <StyledIcon icon="user-circle" className="fa-5x" />
        <StyledIconSmall icon="plus-circle" size="lg" />
      </ProfileWrapper>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <FormInput
            name="name"
            type="text"
            onChange={handleInputChange}
            value={inputs.name}
            label="Name"
            hasDarkBackground
            required
          />
        </InputContainer>
        <InputContainer>
          <FormInput
            name="email"
            type="email"
            onChange={handleInputChange}
            value={inputs.email}
            label="Email"
            hasDarkBackground
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
            hasDarkBackground
            minLength="8"
          />
        </InputContainer>
        {registerError && <ErrorText>sorry could not register</ErrorText>}
        <Button type="submit" value="Sign in">
          Create account
        </Button>
      </Form>
    </Layout>
  );
}

export default Account;
