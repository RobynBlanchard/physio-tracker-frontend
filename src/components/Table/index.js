import { useState, useRef } from 'react';
import { arrayOf, string, shape } from 'prop-types';
import {
  TableStyle,
  TableRow,
  TableHeader,
  TableData,
  StyledIcon,
  IconButton,
} from './style';

const Table = ({
  handleEdit,
  handleDelete,
  editSets = false,
  tableHeadings = [],
  rowData = [],
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
                  <IconButton
                    id="edit-button"
                    onClick={() => handleEditSet(row)}
                  >
                    <StyledIcon
                      fill={'black'}
                      aria-hidden="true"
                      title="Edit session"
                      aria-label="Edit"
                      icon="edit"
                      size="lg"
                    />
                  </IconButton>
                ) : (
                  <IconButton id="save-button" onClick={handleSaveEdittedSet}>
                    <StyledIcon
                      fill={'black'}
                      aria-hidden="true"
                      title="Save session"
                      aria-label="Save"
                      icon="save"
                      size="lg"
                    />
                  </IconButton>
                )}

                <IconButton
                  id="delete-button"
                  onClick={() => handleDelete(row.id)}
                >
                  <StyledIcon
                    fill={'black'}
                    aria-hidden="true"
                    title="Delete this session?"
                    aria-label="Delete"
                    icon="trash-alt"
                    size="lg"
                  />
                </IconButton>
              </TableData>
            )}
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
      name: string,
    })
  ),
  rowData: arrayOf(shape({})),
};

export default Table;
