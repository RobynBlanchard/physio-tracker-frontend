import { useState } from 'react';
import { arrayOf, string, shape, func, bool } from 'prop-types';
import { TableStyle, TableRow, TableHeader, TableData } from './style';
import { SaveButton, EditButton, DeleteButton } from '../CRUDButtons';

const Table = ({
  handleEdit,
  handleDelete,
  editSets,
  tableHeadings,
  rowData,
}) => {
  const [curEdittedSet, setCurEdittedSet] = useState(null);
  const shouldRenderEdit = editSets && rowData.length > 0;

  const handleEditSet = (row) => {
    setCurEdittedSet(row);
  };

  const handleSaveEdittedSet = () => {
    handleEdit(curEdittedSet);
    setCurEdittedSet(null);
  };

  const handleChange = (e, metric) => {
    e.persist();
    setCurEdittedSet((prev) => ({
      ...prev,
      [metric]: parseInt(e.target.value, 10),
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
          {shouldRenderEdit && <TableHeader>Edit</TableHeader>}
        </TableRow>
      </thead>
      <tbody>
        {rowData.map((row) => (
          <TableRow key={row.id}>
            {tableHeadings.map((heading) => {
              const renderInput = () => (
                <input
                  value={curEdittedSet[heading.colID]}
                  onChange={(e) => handleChange(e, heading.colID)}
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
                    fill="black"
                  />
                ) : (
                  <SaveButton
                    onClick={handleSaveEdittedSet}
                    title="Save set"
                    fill="black"
                  />
                )}
                <DeleteButton
                  onClick={() => handleDelete(row.id)}
                  title="Delete this set?"
                  fill="black"
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
  editSets: bool,
};

export default Table;
