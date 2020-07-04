import styled from 'styled-components';

export const Title = styled.p`
  font-size: ${({ theme }) => theme.font.size.XL};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => `${theme.spacing.S} ${theme.spacing.XS}`};
`;

export const Anchor = styled.a`
  text-decoration: none;
  cursor: pointer;
  width: 100%;
`;
