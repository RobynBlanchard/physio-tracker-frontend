import Router from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { func } from 'prop-types';
import { Layout, Button } from '../components';
import { useAuth } from '../context/authentication';

const Text = styled.h2`
  color: ${({ theme }) => theme.colors.darkestGrey};
  text-align: center;
  margin: 20px;
`;

const Wrapper = styled.div`
  text-align: center;
`;

const ProfileWrapper = styled.div`
  text-align: center;
  margin: 50px;
`;

export const GET_USER = gql`
  query me {
    me {
      name
    }
  }
`;

const Account = ({ resetStore }) => {
  const { data, logout } = useAuth();

  useEffect(() => {
    console.log(data)
    if (!data) {
      console.log('here')
      Router.push('/');
    }
  }, []);

  const handleLogOut = () => {
    resetStore();
    // TODO:// resetStore().then(res => console.log(res)); // can this be done in context/authentication ?
    logout();
    Router.push('/');
  };

  return (
    <Layout title="Account">
      <ProfileWrapper>
        <img src="/images/account.png" alt="profile" />
      </ProfileWrapper>
      <Wrapper>
        <Text>
          Hello&nbsp;
          {data && data.me.name}
        </Text>
        <Button onClick={handleLogOut}>sign out</Button>
      </Wrapper>
    </Layout>
  );
};

Account.propTypes = {
  resetStore: func.isRequired,
};

export default Account;
