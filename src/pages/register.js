import Router from 'next/router';
import styled from 'styled-components';
import { useState } from 'react';
import { Layout, FormInput, Button, ErrorText } from '../components';
// import { register } from '../api/auth-client';
import useForm from '../customHooks/useForm';
import { useAuth } from '../context/authentication';

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
`;

function Account() {
  // const [addUser, addUserResponse] = useMutation(CREATE_USER);
  const { register, data } = useAuth();
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
    <Layout title="Register">
      <ProfileWrapper>
        <img src="/images/new-user-icon.png" alt="profile" />
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
