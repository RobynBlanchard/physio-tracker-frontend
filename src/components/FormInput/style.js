import styled from 'styled-components';

export const StyledInput = styled.input`
  padding: 8px 0;
  width: 100%;
  margin: 8px 0;
  outline: 0;
  border-width: 0 0 2px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightestGrey};
  /* border-bottom: 1px solid
    ${({ theme, hasDarkBackground }) =>
      hasDarkBackground ? theme.colors.white : theme.colors.primary}; */
  background: none;
  /* caret-color: ${({ theme }) => theme.colors.primary}; */
  caret-color: white;
  font-size: 16px;
  color: white;
`;

export const StyledLabel = styled.label`
  color: white;
  font-size: 16px;
`;

// Photo by Tyler Nix on Unsplash
// Photo by Clem Onojeghuo on Unsplash
// Photo by Malik Shibly on Unsplash
