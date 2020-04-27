import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BaseButton from '../../styles/baseButton';

export const IconButton = styled(BaseButton)`
  margin: 0 4px;
`;

export const StyledIcon = styled(FontAwesomeIcon)`
  color: ${({ theme, fill }) => fill || theme.colors.white};
  width: 20px;
  pointer-events: none;
`;

export const ExerciseItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.white};
`;
