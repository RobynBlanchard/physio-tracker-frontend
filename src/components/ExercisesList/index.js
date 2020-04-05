import { useState } from 'react';
import { Wrapper, ExerciseListWrapper } from './style';
import ToggleSwitch from '../ToggleSwitch';
import TitleLink from './TitleLink';
import ExerciseSummary from './ExerciseSummary';
import { arrayOf, string, shape } from 'prop-types';

const ExercisesList = ({ exercises = [] }) => {
  const [toggleAll, setToggleAll] = useState(false);

  const handleToggleAll = () => {
    setToggleAll((prevState) => !prevState);
  };

  return (
    <>
      {exercises.length > 0 && <ToggleSwitch onClick={handleToggleAll} />}
      <ExerciseListWrapper>
        {exercises.map((exercise) => {
          const { name, id } = exercise;

          return (
            <React.Fragment key={`${name}_${id}`}>
              <TitleLink title={name} exerciseId={id} />

              <Wrapper open={toggleAll}>
                <ExerciseSummary sets={3} reps={12} weight={17.5} />
              </Wrapper>
            </React.Fragment>
          );
        })}
      </ExerciseListWrapper>
    </>
  );
};

ExercisesList.propTypes = {
  exercises: arrayOf(
    shape({
      name: string,

      // exercise summary props TODO:
    })
  ),
};

export default ExercisesList;
