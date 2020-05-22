import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const StyledIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.white};
  /* width: 20px; */
`;

export const Nav = styled.nav`
  /* width: 100%; */
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
  margin: 25px;
`;
