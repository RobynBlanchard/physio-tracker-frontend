import Link from 'next/link';
import { Anchor, ListItem, List, Nav, StyledIcon } from './style';
import { useAuth } from '../../context/authentication';

const Navigation = ({backgroundID}) => {
  const { user } = useAuth();
  const accountLink = user && user.token ? '/account' : '/signIn';

  const fill = [4,5].includes(backgroundID) ? '#7433dd' : 'white' ; // to do primary color
  console.log('fill', fill)
  console.log('fill', backgroundID)

  return (
    <Nav>
      <List>
        <ListItem>
          <Link href="/">
            <Anchor>
              <StyledIcon fill={fill} icon="home" size="lg" />
            </Anchor>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/sessions">
            <Anchor>
              <StyledIcon fill={fill} icon="dumbbell" size="lg" />
            </Anchor>
          </Link>
        </ListItem>

        <ListItem>
          {/* TODO <Link href="/analysis"> */}
          <Link href="/#">
            <Anchor>
              <StyledIcon fill={fill} icon="chart-line" size="lg" />
            </Anchor>
          </Link>
        </ListItem>

        <Link href={accountLink}>
          <ListItem>
            <Anchor>
              <StyledIcon fill={fill} icon="user" size="lg" />
            </Anchor>
          </ListItem>
        </Link>
      </List>
    </Nav>
  );
};

export default Navigation;
