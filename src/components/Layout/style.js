import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import breakpoints from '../../styles/breakpoints';

export const ContentContainer = styled.div`
  max-width: ${breakpoints.tablet}px;
  padding: 20px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const LayoutContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-bottom: 60px; /* nav size */
`;

export const Loading = styled(FontAwesomeIcon)`
  position: absolute;
  left: 50%;
  top: 40%;
  color: ${({ theme }) => theme.colors.text};
`;
