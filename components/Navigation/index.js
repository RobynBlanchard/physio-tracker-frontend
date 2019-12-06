import Link from 'next/link';
import { Anchor, ListItem, List, Nav } from './style';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid'
// import fontawesome from '@fortawesome/fontawesome'
// // import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// fontawesome.library.add(faCheckSquare, faCoffee);

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUser,
  faHome,
  faChartLine,
  faDumbbell
} from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faHome, faChartLine, faDumbbell);

const Navigation = () => {
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

        <Link href="/user">
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
