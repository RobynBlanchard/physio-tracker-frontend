import Link from 'next/link';
import { string } from 'prop-types';

import { Title, Anchor } from './style';

const TitleLink = ({ title }) => (
  <Link href="/exercises/sets/[id]" as={`/exercises/sets/${title}`}>
    <Anchor>
      <Title>{title}</Title>
    </Anchor>
  </Link>
);

TitleLink.propTypes = {
  title: string
};

export default TitleLink;
