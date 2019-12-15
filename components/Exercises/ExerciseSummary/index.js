import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledIcon = styled(FontAwesomeIcon)`
  width: 20px;
  margin: 0 18px;
  color: #e4e4e4;
`;

const TextWrapper = styled.div`
  padding: 10px;
  color: #e4e4e4;
`;

const ExerciseSummary = () => {
  return (
    <TextWrapper>
      <StyledIcon icon="layer-group" /> 10 sets
      <StyledIcon icon="redo-alt" /> 8 reps
      <StyledIcon icon="weight-hanging" /> 60kg
    </TextWrapper>
  );
};

export default ExerciseSummary;
