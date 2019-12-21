import styled from 'styled-components';

export const TableStyle = styled.table`
  width: 100%;
  /* margin-top: 10px; */
  /* background: white; */
  background: #2553bc;
  border-collapse: collapse;
  color: white;
`;

export const TableHeader = styled.th`
  padding: ${({ theme }) => theme.spacing.M};
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
