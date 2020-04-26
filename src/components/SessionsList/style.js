import styled from 'styled-components';

export const Anchor = styled.a`
  cursor: pointer;
  margin: 0;
  display: flex;
  justify-content: space-between;
  color: white;
  text-decoration: none;
`;

export const List = styled.li`
  list-style: none;
  padding: 0;
  max-height: 60vh;
  overflow-y: scroll;
`;

export const ListItem = styled.ul`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid white;
  padding: 12px 8px;
`;

export const Text = styled.p`
  margin: 0;
`;
