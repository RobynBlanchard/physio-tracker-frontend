import styled from 'styled-components';

export const Wrapper = styled.div`
  /* border: 1px solid grey; */
  border: 2px solid white;
`;

export const Tab = styled.button`
  padding: ${({ theme }) => `${theme.spacing.M} ${theme.spacing.L}`};
  height: 50px;
  width: calc(100% / 3);
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${({ current, theme }) =>
    current ? theme.colors.primaryDark : theme.colors.primary};
  font-size: ${({ theme }) => theme.font.size.L};
  color: ${({ current }) => (current ? 'black' : 'white')};
  font-weight: ${({ theme }) => theme.font.weight.M};
  color: white;
  /* background: ; */
`;

export const TabContent = styled.div``;
