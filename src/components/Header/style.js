import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const StyledIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.text};
  width: 20px;
  margin-right: 10px;
  margin: 0 18px;
`;

export const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 32px;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const Anchor = styled.a`
  padding-right: 20px;
  color: ${({ theme }) => theme.colors.text};
`;
