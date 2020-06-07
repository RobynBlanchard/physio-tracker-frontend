import { useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Layout, Button } from '../components';
import { useAuth } from '../customHooks/useAuth';

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

const ButtonWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
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
        <ButtonWrapper>
          <Button onClick={logout}>sign out</Button>
        </ButtonWrapper>
      </Wrapper>
    </Layout>
  );
};

export default Account;
