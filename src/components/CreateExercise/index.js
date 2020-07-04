import { useState } from 'react';
import { func } from 'prop-types';
import FormInput from '../FormInput';
import Label from '../Label';
import Button from '../Button';
import {
  Wrapper,
  CloseButton,
  ButtonOption,
  MainHeading,
  ButtonAlign,
} from './style';

const defaultState = {
  DISTANCE: false,
  TIME: false,
  REPS: false,
  WEIGHT: false,
};

export const HEADING = 'Custom Exercise';
export const INPUT_NAME_LABEL = 'Exercise name:';
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
      <MainHeading>{HEADING}</MainHeading>
      <FormInput
        label={INPUT_NAME_LABEL}
        value={exerciseName}
        onChange={(e) => setExerciseName(e.target.value)}
      />
      <Label>{SELECT_METRICS_HEADING}</Label>
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
