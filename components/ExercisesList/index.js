import { useState } from 'react';
import { Wrapper } from './style';
import ToggleSwitch from '../ToggleSwitch';
import TitleLink from './TitleLink';
import ExerciseSummary from './ExerciseSummary';
import { arrayOf, string, shape } from 'prop-types';

const ExercisesList = ({ exercises = [] }) => {
  const [toggleAll, setToggleAll] = useState(false);

  const handleToggleAll = () => {
    setToggleAll(prevState => !toggleAll);
  };

  return (
    <>
      {exercises.length > 0 && <ToggleSwitch onClick={handleToggleAll} />}
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

ExercisesList.propTypes = {
  exercises: arrayOf(
    shape({
      name: string

      // exercise summary props TODO:
    })
  )
};

export default ExercisesList;
