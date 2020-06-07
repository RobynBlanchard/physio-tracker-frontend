import { useState } from 'react';
import { func } from 'prop-types';
import InputBlock from '../InputBlock';
import Button from '../Button';
import {
  Wrapper,
  CloseButton,
  ButtonOption,
  MainHeading,
  SubHeading,
  ButtonAlign,
} from './style';

const defaultState = {
  DISTANCE: false,
  TIME: false,
  REPS: false,
  WEIGHT: false,
};

export const MAIN_HEADING = 'Custom Exercise';
export const INPUT_NAME_HEADING = 'Exercise name:';
export const SELECT_METRICS_HEADING = 'What do you want to measure?';

export const metrics = ['TIME', 'DISTANCE', 'WEIGHT', 'REPS'];

const CreateExercise = ({ closeModal, handleAddCustomExercise }) => {
  const [selectedExercises, setSelectedExercises] = useState(defaultState);
  const [exerciseName, setExerciseName] = useState('');

  const handleButtonSelect = (metric) => {
    setSelectedExercises((prevState) => {
      return {
        ...prevState,
        [metric]: !prevState[metric],
      };
    });
  };

  const handleSubmit = () => {
    const selectedMetrics = Object.entries(selectedExercises).reduce(
      (acc, [metric, isSelected]) => {
        return isSelected ? acc.concat(metric) : acc;
      },
      []
    );

    handleAddCustomExercise(exerciseName, selectedMetrics);
  };

  return (
    <Wrapper id="create-exercise">
      <CloseButton aria-label="close" onClick={closeModal} />
      <MainHeading>{MAIN_HEADING}</MainHeading>
      <SubHeading>{INPUT_NAME_HEADING}</SubHeading>
      <InputBlock
        value={exerciseName}
        onChange={(e) => setExerciseName(e.target.value)}
      />
      <SubHeading>{SELECT_METRICS_HEADING}</SubHeading>
      {metrics.map((metric) => (
        <ButtonOption
          onClick={() => handleButtonSelect(metric)}
          isSelected={selectedExercises[metric]}
        >
          {metric}
        </ButtonOption>
      ))}
      <ButtonAlign>
        <Button onClick={handleSubmit}>Add +</Button>
      </ButtonAlign>
    </Wrapper>
  );
};

CreateExercise.propTypes = {
  closeModal: func.isRequired,
  handleAddCustomExercise: func.isRequired,
};

export default CreateExercise;
