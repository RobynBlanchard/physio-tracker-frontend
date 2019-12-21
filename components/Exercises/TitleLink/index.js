import Link from 'next/link';
import { string } from 'prop-types';

import { Title, Anchor } from './style';

const TitleLink = ({ title }) => (
  <Link href="/session/exercise/[id]" as={`/session/exercise/${title}`}>
    <Anchor>
      <Title>{title}</Title>
    </Anchor>
  </Link>
);

TitleLink.propTypes = {
  title: string
};

export default TitleLink;
