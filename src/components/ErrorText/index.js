import styled from 'styled-components';

const ErrorText = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.red};
`;

export default ErrorText;
