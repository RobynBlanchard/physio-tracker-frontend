import styled from 'styled-components';

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.font.size.XL};
  color: white;
  padding: ${({ theme }) => `${theme.spacing.S} ${theme.spacing.XS}`};
`;

export const Anchor = styled.a`
  text-decoration: none;
`;