import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { Layout, FormInput, Button, ErrorText } from '../components';
import { useAuth } from '../context/authentication';
import useForm from '../customHooks/useForm';

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

  const createAccount = (inputs) =>
    addUser({
      variables: {
        data: {
          name: inputs.name,
          email: inputs.email,
          password: inputs.password,
        },
      },
    });
  const { inputs, handleInputChange, handleSubmit } = useForm(
    { name: '', email: '', password: '' },
    createAccount
  );

  // move to component did mount ???
  // without !user || !user.token - get max depth exceeded error
  if (addUserResponse.data && (!user || !user.token)) {
    const { token } = addUserResponse.data.createUser;
    if (token) {
      const email = null; // TODO
      const { name } = addUserResponse.data.createUser.user;

      register(token, name, email);
    }
  }

  if (addUserResponse.data && user && user.token) {
    Router.push('/account');
  }

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
        <ErrorText>
          {addUserResponse.error && addUserResponse.error.message}
        </ErrorText>

        <Button type="submit" value="Sign in">
          Create account
        </Button>
      </Form>
      <style jsx />
    </Layout>
  );
}

export default Account;
