import Link from 'next/link';
import { string, arrayOf } from 'prop-types';
import { Title, Anchor } from './style';
import { formatExercise } from '../../../util';

const TitleLink = ({ title, exerciseId, metrics }) => {
  return (
    <Link
      href="/exercises/sets/[id]/[title]/[metrics]"
      as={`/exercises/sets/${exerciseId}/${title}/${metrics}`}
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
  metrics: arrayOf(string).isRequired,
};

export default TitleLink;
