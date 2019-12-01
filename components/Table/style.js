import styled from 'styled-components';

export const TableStyle = styled.table`
  width: 100%;
  margin-top: 10px;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  padding: ${props => props.theme.spacing.M};
  width: calc(100% / 3);
  font-weight: 500;
`;

export const TableData = styled.td`
  padding: ${props => props.theme.spacing.M};
  width: calc(100% / 3);
  text-align: center;
`;

export const TableRow = styled.tr`
  border-bottom: solid 1px lightgrey;
`;
