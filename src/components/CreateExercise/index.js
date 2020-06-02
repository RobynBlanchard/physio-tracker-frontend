import { useState } from 'react';
import styled from 'styled-components';
import baseButton from '../../styles/baseButton';
import InputBlock from '../InputBlock';
import Button from '../Button';

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.primaryDark};
  min-width: 270px;
  color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing.XL};
  margin: ${({ theme }) => theme.spacing.XL};
`;

// TODO secondary button
const ButtonOption = styled(baseButton)`
  padding: 8px;
  color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  background: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.teritary : theme.colors.primary};
  margin: 8px;

  &:active {
    background: ${({ theme }) => theme.colors.teritary};
  }

  /* cursor: pointer; */

  width: calc(50% - 16px);
`;

const MainHeading = styled.h2`
  margin: ${({ theme }) => theme.spacing.XL} 0;
`;

const SubHeading = styled.h3`
  margin: ${({ theme }) => theme.spacing.M} 0;
`;

const ButtonAlign = styled.div``;

const defaultState = {
  DISTANCE: false,
  TIME: false,
  REPS: false,
  WEIGHT: false,
};

const metrics = ['TIME', 'DISTANCE', 'WEIGHT', 'REPS'];

const CreateExercise = ({ handleAddCustomExercise }) => {
  const [selectedExercises, setSelectedExercises] = useState(defaultState);
  const [exerciseName, setExerciseName] = useState(''); // tODO use use form hook?

  const handleButtonSelect = (metric) => {
    // console.log(metric)
    setSelectedExercises((prevState) => {
      // debugger;
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
    <Wrapper id="thing">
      <MainHeading>Custom Exercise</MainHeading>
      <SubHeading>Name:</SubHeading>
      {/* <input /> */}
      <InputBlock
        value={exerciseName}
        onChange={(e) => setExerciseName(e.target.value)}
      />
      <SubHeading>Metrics:</SubHeading>
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

export default CreateExercise;
