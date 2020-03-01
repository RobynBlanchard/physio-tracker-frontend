import Link from 'next/link';
import { string } from 'prop-types';

import { Title, Anchor } from './style';
import exerciseToSet from '../../../util/mapExerciseToSetType';

const TitleLink = ({ title, exerciseId }) => {
  const setsInterfaceType = exerciseToSet[title];

  return (
    // option 1
    // <Link
    //   href={`/exercises/${setsInterfaceType}/[id]}`}
    //   as={`/exercises/${setsInterfaceType}/${exerciseId}`}
    // >
    // option 2
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
