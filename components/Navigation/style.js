import styled from 'styled-components';

export const Nav = styled.nav`
  /* position: fixed;
  bottom: 0;
  left: 0; */
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
`;

export const List = styled.ul`
  display: flex;
  justify-content: space-around;
  padding: 0;
`;
