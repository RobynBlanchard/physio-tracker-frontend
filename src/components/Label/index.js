import styled from 'styled-components';

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.font.size.L};
  display: block;
  text-align: left;
`;

export default Label;
