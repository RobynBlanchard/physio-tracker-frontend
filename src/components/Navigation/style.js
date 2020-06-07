import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const StyledIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.white};
`;

export const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding-bottom: ${({ theme }) => theme.spacing.XS};
  text-align: center;
  background: ${({ theme }) => theme.colors.primaryDark};
  border-top: 1px solid ${({ theme }) => theme.colors.primary};
`;

export const Anchor = styled.a`
  text-decoration: none;
`;

export const ListItem = styled.li`
  list-style: none;
  cursor: pointer;
`;

export const List = styled.ul`
  display: flex;
  justify-content: space-around;
  padding: 0;
  margin: ${({ theme }) => theme.spacing.L} 0;
`;
