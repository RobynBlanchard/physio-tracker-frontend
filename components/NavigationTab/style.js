import styled from 'styled-components';

export const Wrapper = styled.div`
  border: 1px solid grey;
`;

export const Tab = styled.button`
  padding: ${({ theme }) => `${theme.spacing.M} ${theme.spacing.L}`};
  height: 50px;
  width: calc(100% / 3);
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${({ current }) => (current ? 'white' : '#29b6f6')};
  font-size: ${({ theme }) => theme.font.size.L};
  color: ${({ current }) => (current ? 'black' : 'white')};
  font-weight: ${({ theme }) => theme.font.weight.M};
`;

export const TabContent = styled.div``;
