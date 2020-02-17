import Router from 'next/router';
import { Layout, Button } from '../components';
import { useAuth } from '../context/authentication';
import { useEffect } from 'react';
import styled from 'styled-components';

const Text = styled.h2`
  color: white;
  text-align: center;
  margin: 20px;
`;

const Wrapper = styled.div`
  text-align: center;

`;

function Account() {
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user || !user.token) {
      Router.push('/signIn');
    }
  }, []);

  const handleLogOut = () => {
    logout();
    Router.push('/signIn');
  };

  return (
    <Layout title={'Account'}>
      <Wrapper>
        <Text>Hello {user && user.name}</Text>
        <Button onClick={handleLogOut}>sign out</Button>
      </Wrapper>
      <style jsx>{``}</style>
    </Layout>
  );
}

export default Account;
