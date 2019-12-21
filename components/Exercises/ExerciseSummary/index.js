import { StyledIcon, TextWrapper } from './style';

const ExerciseSummary = ({ sets, reps, weight }) => {
  return (
    <TextWrapper>
      <StyledIcon icon="layer-group" /> {sets} sets
      <StyledIcon icon="redo-alt" /> {reps} reps
      <StyledIcon icon="weight-hanging" /> {weight}kg
    </TextWrapper>
  );
};

export default ExerciseSummary;
