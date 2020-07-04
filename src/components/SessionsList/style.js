import styled from 'styled-components';
import cardStyle from '../../styles/card';

export const Anchor = styled.a`
  cursor: pointer;
  margin: 0;
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  width: 100%;
`;

export const List = styled.li`
  list-style: none;
  padding: 0;
`;

export const ListItem = styled.ul`
  ${cardStyle}
  padding: ${({ theme }) => `${theme.spacing.S} ${theme.spacing.S}`};
`;

export const Text = styled.p`
  margin: 0;
`;

export const EditButtonsWrapper = styled.div`
  display: flex;
`;
