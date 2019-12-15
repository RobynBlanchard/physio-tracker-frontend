import { useState } from 'react';
import { Wrapper } from './style';
import ToggleSwitch from '../ToggleSwitch';
import TitleLink from './TitleLink';
import ExerciseSummary from './ExerciseSummary';

const Exercises = ({exercises}) => {
  const [toggleAll, setToggleAll] = useState(false);

  const handleToggleAll = () => {
    setToggleAll(prevState => !toggleAll);
  };

  return (
    <>
      <ToggleSwitch onClick={handleToggleAll} />
      {exercises.map(exercise => {
        return (
          <React.Fragment key={exercise.name}>
            <TitleLink title={exercise.name} />

            <Wrapper open={toggleAll}>
              <ExerciseSummary />
            </Wrapper>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Exercises;
