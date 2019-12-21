import { number } from 'prop-types';
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

ExerciseSummary.propTypes = {
  sets: number,
  reps: number,
  weight: number
};

export default ExerciseSummary;
