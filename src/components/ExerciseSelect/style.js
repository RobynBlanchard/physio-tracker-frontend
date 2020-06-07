import styled from 'styled-components';
import { media } from '../../styles/breakpoints';

// eslint-disable-next-line import/prefer-default-export
export const Select = styled.select`
  width: 100%;
  font-size: ${({ theme }) => theme.font.size.L};
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.XS};

  ${media.tablet`
    padding: ${({ theme }) => theme.spacing.L};
    border-radius: 12px;
  `}
`;
