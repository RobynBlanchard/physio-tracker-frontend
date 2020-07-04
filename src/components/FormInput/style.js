import styled from 'styled-components';

const StyledInput = styled.input`
  padding: ${({ theme }) => theme.spacing.XS} 0;
  width: 100%;
  margin: ${({ theme }) => theme.spacing.XS} 0;
  outline: 0;
  border-width: 0 0 2px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: none;
  caret-color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.font.size.L};
  color: ${({ theme }) => theme.colors.text};
`;

export default StyledInput;
