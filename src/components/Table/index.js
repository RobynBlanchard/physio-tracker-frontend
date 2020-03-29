import { arrayOf, string, shape } from 'prop-types';
import { TableStyle, TableRow, TableHeader, TableData } from './style';

const Table = ({ tableHeadings = [], rowData = [] }) => {
  return (
    <TableStyle>
      <thead>
        <TableRow>
          {tableHeadings.map(heading => (
            <TableHeader key={heading.colID}>{heading.name}</TableHeader>
          ))}
        </TableRow>
      </thead>
      <tbody>
        {rowData.map(row => (
          <TableRow key={row.id}>
            {tableHeadings.map(heading => (
              <TableData key={heading.colID}>{row[heading.colID]}</TableData>
            ))}
          </TableRow>
        ))}
      </tbody>
    </TableStyle>
  );
};

Table.propTypes = {
  tableHeadings: arrayOf(
    shape({
      colID: string,
      name: string
    })
  ),
  rowData: arrayOf(shape({}))
};

export default Table;
