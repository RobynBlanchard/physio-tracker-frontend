import Link from 'next/link';
import { string } from 'prop-types';
import { Title, Anchor } from './style';

const TitleLink = ({ title, exerciseId }) => {
  return (
    <Link
      href="/exercises/sets/[id]/[title]"
      as={`/exercises/sets/${exerciseId}/${title}`}
    >
      <Anchor>
        <Title>{title}</Title>
      </Anchor>
    </Link>
  );
};

TitleLink.propTypes = {
  title: string
};

export default TitleLink;
