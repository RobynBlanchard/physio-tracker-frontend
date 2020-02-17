import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Layout, FormInput, Button } from '../components';
import { useAuth } from '../context/authentication';
import useForm from '../util/useForm';
import styled from 'styled-components';

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
    Router.push('/account');
  }

  console.log(user);
  console.log(addUserResponse);

  return (
    <Layout title={'Account'}>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <FormInput
            name="name"
            type="text"
            onChange={handleInputChange}
            value={inputs.name}
            label="Name"
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
        <div>{addUserResponse.error && addUserResponse.error.message}</div>

        <Button type="submit" value="Sign in">
          Create account
        </Button>
      </Form>
      <style jsx>{``}</style>
    </Layout>
  );
}

export default Account;
