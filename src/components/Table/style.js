import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BaseButton from '../../styles/baseButton';
import { media } from '../../styles/breakpoints';

export const StyledInput = styled.input`
  width: 60%;
  padding: 4px;
  border-radius: 4px;
`;

export const IconButton = styled(BaseButton)`
  margin: 0 4px;
`;

export const StyledIcon = styled(FontAwesomeIcon)`
  color: ${({ theme, fill }) => fill || theme.colors.white};
  width: 20px;
  pointer-events: none;
`;

export const TableStyle = styled.table`
  width: 100%;
  background: rgba(0, 0, 0, 0.12);
  border-collapse: collapse;
  color: white;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
`;

export const TableHeader = styled.th`
  padding: ${({ theme }) => theme.spacing.XS};
  ${media.tablet`
    padding: ${({ theme }) => theme.spacing.M};
  `}
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.primaryLight};
  width: ${({ columns }) => `calc(100% / ${columns})`};
  font-weight: 500;
  text-transform: capitalize;
`;

export const TableData = styled.td`
  width: ${({ columns }) => `calc(100% / ${columns})`};
  box-sizing: border-box;
  padding: ${({ theme }) => theme.spacing.XS};
  text-align: center;
`;

export const EditActions = styled(TableData)`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const TableRow = styled.tr`
  border-bottom: solid 1px lightgrey;
`;
