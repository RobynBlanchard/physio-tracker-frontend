import Link from 'next/link';
import { string } from 'prop-types';
import { Title, Anchor } from './style';
import { formatExercise } from '../../../util';

const TitleLink = ({ title, exerciseId }) => {
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
  title: string.isRequired,
  exerciseId: string.isRequired,
};

export default TitleLink;
