import styled from 'styled-components';

export const StyledInput = styled.input`
  padding: 8px 0;
  width: 100%;
  margin: 8px 0;
  outline: 0;
  border-width: 0 0 2px;
  border-bottom: 1px solid
    ${({ theme, hasDarkBackground }) =>
      hasDarkBackground ? theme.colors.white : theme.colors.primary};
  background: none;
  caret-color: ${({ theme }) => theme.colors.primary};
  font-size: 16px;
  color: ${({ theme, hasDarkBackground }) =>
    hasDarkBackground ? theme.colors.lightestGrey : theme.colors.darkestGrey};
`;

export const StyledLabel = styled.label`
  color: ${({ theme, hasDarkBackground }) =>
    hasDarkBackground ? theme.colors.white : theme.colors.darkestGrey};
  font-size: 16px;
`;
