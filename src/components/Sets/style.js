import styled from 'styled-components';

export const ValidationErrorWrapper = styled.div`
  opacity: ${({ hasError }) => (hasError ? 1 : 0)};
  height: ${({ hasError }) => (hasError ? 'auto' : 0)};
  transition: opacity 0.2s;
`;

export const EditButton = styled.button`
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.XS};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 12px;
  margin: ${({ theme }) => `${theme.spacing.XXS} 0`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  text-transform: uppercase;
`;
