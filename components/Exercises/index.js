import { useState } from 'react';
import { Wrapper } from './style';
import ToggleSwitch from '../ToggleSwitch';
import TitleLink from './TitleLink';
import ExerciseSummary from './ExerciseSummary';
import { arrayOf, string, shape } from 'prop-types';

const Exercises = ({ exercises }) => {
  const [toggleAll, setToggleAll] = useState(false);

  const handleToggleAll = () => {
    setToggleAll(prevState => !toggleAll);
  };

  return (
    <>
      <ToggleSwitch onClick={handleToggleAll} />
      {exercises.map(exercise => {
        const { name } = exercise;
        return (
          <React.Fragment key={name}>
            <TitleLink title={name} />

            <Wrapper open={toggleAll}>
              <ExerciseSummary sets={3} reps={12} weight={17.5} />
            </Wrapper>
          </React.Fragment>
        );
      })}
    </>
  );
};

Exercises.propTypes = {
  exercises: arrayOf(
    shape({
      name: string

      // exercise summary props TODO:
    })
  )
};

export default Exercises;
