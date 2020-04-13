import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BaseButton } from '../../styles/utils';

export const Wrapper = styled.div`
  max-height: ${({ open }) => (open ? '100px' : '0')};
  overflow: ${({ open }) => (open ? 'auto' : 'hidden')};
  border-bottom: 1px solid white;
  transition: max-height 0.5s, overflow 0.5s 0.5s;
  color: ${({ theme }) => theme.colors.white};
`;

export const ExerciseListWrapper = styled.div`
  max-height: 55vh;
  overflow-y: scroll;
`;

export const IconButton = styled(BaseButton)`
  margin: 0 4px;
`;

export const StyledIcon = styled(FontAwesomeIcon)`
  color: ${({ theme, fill }) => (fill ? fill : theme.colors.white)};
  width: 20px;
  pointer-events: none;
`;

export const ExerciseItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
