import styled from 'styled-components';

export const TableStyle = styled.table`
  width: 100%;
  background: ${({ theme }) => theme.colors.lightestGrey};
  border-collapse: collapse;
  color:  ${({ theme }) => theme.colors.darkestGrey};
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
`;

export const TableHeader = styled.th`
  padding: ${({ theme }) => theme.spacing.M};
  background: ${({ theme }) => theme.colors.grey};
  width: calc(100% / 3);
  font-weight: 500;
`;

export const TableData = styled.td`
  padding: ${({ theme }) => theme.spacing.M};
  width: calc(100% / 3);
  text-align: center;
`;

export const TableRow = styled.tr`
  border-bottom: solid 1px lightgrey;
`;
