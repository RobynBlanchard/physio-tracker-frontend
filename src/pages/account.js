import { useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Layout, Button } from '../components';
import { useAuth } from '../context/authentication';

const Text = styled.h2`
  color: ${({ theme }) => theme.colors.lightestGrey};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  margin: 20px;
`;

export const StyledIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.white};
  width: auto !important;
  height: 80px;
`;

const Wrapper = styled.div`
  text-align: center;
`;

const ProfileWrapper = styled.div`
  text-align: center;
  margin: 50px;
`;

const Account = () => {
  const { data, logout, refetch } = useAuth();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Layout title="Account">
      <ProfileWrapper>
        <StyledIcon icon="user-circle" />
      </ProfileWrapper>
      <Wrapper>
        <Text>
          Hello&nbsp;
          {data && data.me.name}
        </Text>
        <Button onClick={logout}>sign out</Button>
      </Wrapper>
    </Layout>
  );
};

export default Account;
