import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BaseButton from '../../styles/baseButton';

export const IconButton = styled(BaseButton)`
  margin: 0 4px;
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
`;

export const StyledIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.text};
  width: 20px;
  pointer-events: none;
`;
