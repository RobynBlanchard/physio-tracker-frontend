import styled from 'styled-components';
import breakpoints from '../../styles/breakpoints';

export const ContentContainer = styled.div`
  max-width: ${breakpoints.tablet}px;
  padding: 20px;
  width: 100%;
`;

export const NavContainer = styled.div`
  /* height: 20px;
  margin-bottom: 50px; */
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: ${breakpoints.tablet}px;
  text-align: center;
  background: ${({ theme }) => theme.colors.primaryDark};
  border-top: 1px solid ${({ theme }) => theme.colors.primary};
`;

export const LayoutContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
