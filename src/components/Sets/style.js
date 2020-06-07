import styled from 'styled-components';

export const Label = styled.label`
  display: block;
  margin: 4px 0;
  color: ${({ theme }) => theme.colors.white};
  padding: 0 4px;
`;

export const Input = styled.input`
  display: block;
  height: 34px;
  width: 60px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.darkestGrey};
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
`;

export const ValidationErrorWrapper = styled.div`
  opacity: ${({ hasError }) => (hasError ? 1 : 0)};
  height: ${({ hasError }) => (hasError ? 'auto' : 0)};

  transition: opacity 0.2s;
`;

export const EditButton = styled.button`
  background: ${({ theme }) => theme.colors.primaryLight};
  padding: ${({ theme }) => theme.spacing.XS};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  margin: ${({ theme }) => `${theme.spacing.XXS} 0`};
  border: 1px solid ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
`;
