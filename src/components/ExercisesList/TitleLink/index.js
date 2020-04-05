import Link from 'next/link';
import { string } from 'prop-types';
import { Title, Anchor } from './style';
import { formatExercise } from '../../../util';

const TitleLink = ({ title, exerciseId }) => {
  const formattedTitle = formatExercise(title);

  return (
    <Link
      href="/exercises/sets/[id]/[title]"
      as={`/exercises/sets/${exerciseId}/${title}`}
    >
      <Anchor>
        <Title>{formatExercise(title)}</Title>
      </Anchor>
    </Link>
  );
};

TitleLink.propTypes = {
  title: string,
};

export default TitleLink;
