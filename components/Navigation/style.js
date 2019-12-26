import styled from 'styled-components';

export const Nav = styled.nav`
  width: 100%;
  `;

export const Anchor = styled.a`
  text-decoration: none;

  > svg {
    width: 20px;
    color: white;
  }
`;

export const ListItem = styled.li`
  list-style: none;
  cursor: pointer;
`;

export const List = styled.ul`
  display: flex;
  justify-content: space-around;
  padding: 0;
`;
