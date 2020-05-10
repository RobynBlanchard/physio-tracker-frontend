import Router from 'next/router';
import styled from 'styled-components';
import { useState } from 'react';
import { Layout, FormInput, Button, ErrorText } from '../components';
// import { register } from '../api/auth-client';
import useForm from '../customHooks/useForm';
import { useAuth } from '../context/authentication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const StyledIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.white};
  width: auto !important;
  height: 80px; /* todo - use fa sizes */
  /* position: relative; */
`;

export const StyledIconSmall = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.white};
  width: auto !important;
  height: 20px;
  position: absolute;
  bottom: 0;
`;

const Form = styled.form`
  display: flex;
  align-items: column;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  width: 80%;
  text-align: left;
`;

const ProfileWrapper = styled.div`
  text-align: center;
  margin: 50px;
  position: relative;
`;

const Loading = styled(FontAwesomeIcon)`
  position: absolute;
  left: 50%;
  top: 40%;

  color: white;
`;

function Account() {
  // const [addUser, addUserResponse] = useMutation(CREATE_USER);
  const { register, data, registerResponse } = useAuth();
  const [registerError, displayRegisterError] = useState(false);

  const createAccount = (inputs) =>
    register(inputs.name, inputs.email, inputs.password)
      .then(() => {
        console.log('successfully logged in');
        Router.push('/account');
      })
      .catch(() => displayRegisterError(true));

  const { inputs, handleInputChange, handleSubmit } = useForm(
    { name: '', email: '', password: '' },
    createAccount
  );

  // move to component did mount ???
  // without !user || !user.token - get max depth exceeded error
  // if (addUserResponse.data && (!user || !user.token)) {
  //   const { token } = addUserResponse.data.createUser;
  //   if (token) {
  //     register(token);
  //   }
  // }

  // if (addUserResponse.data && user && user.token) {
  //   Router.push('/account');
  // }

  return (
    <Layout
      title="Register"
      isLoading={registerResponse && registerResponse.loading}
    >
      {/* <Loading
          className="spinner"
          // aria-hidden="true"
          // aria-label="Edit"
          icon="spinner"
          size="lg"
          pulse
          // title={title}
          // fill={fill}
        /> */}
      <ProfileWrapper>
        {/* <img src="/images/new-user-icon.png" alt="profile" /> */}
        <StyledIcon icon="user-circle" />
        <StyledIconSmall icon="plus-circle" />
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
        <ErrorText>{registerError && 'sorry could not register'}</ErrorText>

        <Button type="submit" value="Sign in">
          Create account
        </Button>
      </Form>
    </Layout>
  );
}

export default Account;
