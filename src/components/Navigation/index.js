import Link from 'next/link';
import { memo } from 'react';
import { Anchor, ListItem, List, Nav, StyledIcon } from './style';
import { useAuth } from '../../context/authentication';

const Navigation = () => {
  const { data } = useAuth();

  const isSignedIn = data && data.me;
  const accountLink = isSignedIn ? '/account' : '/signIn';

  return (
    <Nav>
      <List>
        <ListItem>
          <Link href="/">
            <Anchor>
              <StyledIcon icon="home" size="lg" />
            </Anchor>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/sessions">
            <Anchor>
              <StyledIcon icon="dumbbell" size="lg" />
            </Anchor>
          </Link>
        </ListItem>

        <ListItem>
          {/* TODO <Link href="/analysis"> */}
          <Link href="/#">
            <Anchor>
              <StyledIcon icon="chart-line" size="lg" />
            </Anchor>
          </Link>
        </ListItem>

        <Link href={accountLink}>
          <ListItem>
            <Anchor>
              <StyledIcon icon="user" size="lg" />
            </Anchor>
          </ListItem>
        </Link>
      </List>
    </Nav>
  );
};

export default memo(Navigation);
