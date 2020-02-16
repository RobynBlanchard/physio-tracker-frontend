import Link from 'next/link';
import { Anchor, ListItem, List, Nav } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../../context/authentication';

const Navigation = () => {
  const { user } = useAuth();
  const accountLink = user && user.token ? '/account' : '/signIn';

  return (
    <Nav>
      <List>
        <ListItem>
          <Link href="/">
            <Anchor>
              <FontAwesomeIcon icon="home" />
            </Anchor>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/sessions">
            <Anchor>
              <FontAwesomeIcon icon="dumbbell" />
            </Anchor>
          </Link>
        </ListItem>

        <ListItem>
          <Link href="/analysis">
            <Anchor>
              <FontAwesomeIcon icon="chart-line" />
            </Anchor>
          </Link>
        </ListItem>

        <Link href={accountLink}>
          <ListItem>
            <Anchor>
              <FontAwesomeIcon icon="user" />
            </Anchor>
          </ListItem>
        </Link>
      </List>
    </Nav>
  );
};

export default Navigation;
