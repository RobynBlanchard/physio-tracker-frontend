import { useState } from 'react';
import { arrayOf, string, shape, func, bool } from 'prop-types';
import {
  TableStyle,
  TableRow,
  TableHeader,
  TableData,
  StyledInput,
} from './style';
import { SaveButton, EditButton, DeleteButton } from '../CRUDButtons';

const Table = ({
  handleEdit,
  handleDelete,
  editSets,
  tableHeadings,
  rowData,
  validateCellOnChange,
}) => {
  const [curEdittedSet, setCurEdittedSet] = useState(null);
  const [validationError, setValidationError] = useState({});

  const shouldRenderEdit = editSets && rowData.length > 0;

  const handleEditSet = (row) => {
    setCurEdittedSet(row);
  };

  const handleSaveEdittedSet = () => {
    handleEdit(curEdittedSet);
    setCurEdittedSet(null);
  };

  const handleChange = (e, metric, rowId) => {
    e.persist();
    const isValidCell = validateCellOnChange(e.target.value, metric, rowId);
    setValidationError({ [rowId]: !isValidCell });
    setCurEdittedSet((prev) => ({
      ...prev,
      [metric]: e.target.value,
    }));
  };
  const isSetUnderEdit = (id) => (!!curEdittedSet && curEdittedSet.id) === id;

  return (
    <TableStyle>
      <thead>
        <TableRow>
          {tableHeadings.map((heading) => (
            <TableHeader key={heading.colID}>{heading.name}</TableHeader>
          ))}
          {shouldRenderEdit && <TableHeader>edit</TableHeader>}
        </TableRow>
      </thead>
      <tbody>
        {rowData.map((row) => (
          <TableRow key={row.id}>
            {tableHeadings.map((heading) => {
              const renderInput = () => (
                <StyledInput
                  value={curEdittedSet[heading.colID]}
                  onChange={(e) => handleChange(e, heading.colID, row.id)}
                />
              );

              return (
                <TableData key={heading.colID}>
                  {isSetUnderEdit(row.id) ? renderInput() : row[heading.colID]}
                </TableData>
              );
            })}
            {shouldRenderEdit && (
              <TableData>
                {!isSetUnderEdit(row.id) ? (
                  <EditButton
                    onClick={() => handleEditSet(row)}
                    title="Edit Set"
                  />
                ) : (
                  <SaveButton
                    onClick={handleSaveEdittedSet}
                    title="Save set"
                    fill={validationError[row.id] ? 'grey' : 'white'}
                    disabled={validationError[row.id]}
                  />
                )}
                <DeleteButton
                  onClick={() => handleDelete(row.id)}
                  title="Delete this set?"
                />
              </TableData>
            )}
          </TableRow>
        ))}
      </tbody>
    </TableStyle>
  );
};

Table.defaultProps = {
  tableHeadings: [],
  rowData: [],
  handleEdit: () => {},
  handleDelete: () => {},
  validateCellOnChange: () => true,
  editSets: false,
};

Table.propTypes = {
  tableHeadings: arrayOf(
    shape({
      colID: string,
      name: string,
    })
  ),
  rowData: arrayOf(shape({})),
  handleEdit: func,
  handleDelete: func,
  validateCellOnChange: func,
  editSets: bool,
};

export default Table;
