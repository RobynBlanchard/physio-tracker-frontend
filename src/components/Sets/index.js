/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-restricted-globals */
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { string } from 'prop-types';

import Table from '../Table';
import Button from '../Button';
import InformationText from '../InformationText';
import ErrorText from '../ErrorText';
import FormInput from '../FormInput';

import useForm from '../../customHooks/useForm';
import errorMessages from '../../errors';

import { ValidationErrorWrapper, EditButton } from './style';
import { GET_SETS, CREATE_SET, UPDATE_SET, DELETE_SET } from './hooks';

export const LOADING_MESSAGE = 'loading sets';
export const ADD_SET_LOADING_MESSAGE = 'adding set';
export const DELETE_SET_LOADING_MESSAGE = 'deleting set';
export const UPDATE_SET_LOADING_MESSAGE = 'updating set';

const Sets = ({ exerciseID, metrics }) => {
  const formattedHeadings = metrics.toLowerCase().split(',');
  const [editSets, setEditSets] = useState(false);
  const [validationError, setValidationError] = useState(null);

  const { loading, error, data } = useQuery(GET_SETS, {
    variables: { exerciseID },
  });
  const [deleteSet, deleteSetResponse] = useMutation(DELETE_SET);
  const [updateSet, updateSetResponse] = useMutation(UPDATE_SET);

  const [addSet, addSetResponse] = useMutation(CREATE_SET);
  const handleAddSet = (inputs) => {
    addSet({
      variables: {
        data: {
          exercise: exerciseID,
          time: parseFloat(inputs.inputtime),
          distance: parseFloat(inputs.inputdistance),
          weight: parseFloat(inputs.inputweight),
          reps: parseFloat(inputs.inputreps),
        },
      },
      refetchQueries: [
        {
          query: GET_SETS,
          variables: { exerciseID },
        },
      ],
    });
  };

  const handleDelete = (id) =>
    deleteSet({
      variables: { id },
      refetchQueries: [
        {
          query: GET_SETS,
          variables: { exerciseID },
        },
      ],
    });

  const handleEdit = (row) => {
    const { id, __typename, ...rest } = row;

    const formattedSetsAsFloats = Object.entries(rest).reduce(
      (acc, [key, val]) => {
        if (val !== null) {
          const formatted = parseFloat(val);
          acc[key] = formatted;
          return acc;
        }
        return acc;
      },
      {}
    );

    return updateSet({
      variables: { id, data: formattedSetsAsFloats },
      refetchQueries: [
        {
          query: GET_SETS,
          variables: { exerciseID },
        },
      ],
    });
  };

  const validateCellOnChange = (value) => {
    const formatted = Number(value);
    if (isNaN(formatted)) {
      setValidationError(new Error(errorMessages.sets.failedValidationError));
      return false;
    }
    setValidationError(null);
    return true;
  };

  const { inputs, handleInputChange, handleSubmit } = useForm({}, handleAddSet);

  const handleInputChangeAddSet = (e) => {
    validateCellOnChange(e.target.value);
    handleInputChange(e);
  };

  const headings = formattedHeadings.map((metricName) => ({
    colID: metricName,
    name: metricName,
  }));

  if (loading) return <InformationText>{LOADING_MESSAGE}</InformationText>;
  if (error) return <ErrorText>{errorMessages.sets.fetchError}</ErrorText>;

  return (
    <div>
      {data && data.sets.length > 0 && (
        <EditButton type="button" onClick={() => setEditSets((prev) => !prev)}>
          Edit
        </EditButton>
      )}
      <Table
        rowData={(data && data.sets) || []}
        tableHeadings={headings}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        validateCellOnChange={validateCellOnChange}
        editSets={editSets}
      />
      <div className="input-align">
        {formattedHeadings.map((heading) => (
          <div className="input" key={`input${heading}`}>
            <FormInput
              id={`input${heading}`}
              label={heading}
              name={`input${heading}`}
              onChange={(e) => handleInputChangeAddSet(e)}
              value={inputs[heading]}
            />
          </div>
        ))}
      </div>
      <ValidationErrorWrapper
        hasError={!!(validationError && validationError.message)}
      >
        <ErrorText>{validationError && validationError.message}</ErrorText>
      </ValidationErrorWrapper>

      <div className="button-align">
        <Button id="add-set" type="submit" onClick={handleSubmit}>
          Add Set +
        </Button>
      </div>
      {addSetResponse.error && (
        <ErrorText>{errorMessages.sets.createError}</ErrorText>
      )}
      {addSetResponse.loading && (
        <InformationText>{ADD_SET_LOADING_MESSAGE}</InformationText>
      )}
      {deleteSetResponse.error && (
        <ErrorText>{errorMessages.sets.deleteError}</ErrorText>
      )}
      {deleteSetResponse.loading && (
        <InformationText>{DELETE_SET_LOADING_MESSAGE}</InformationText>
      )}
      {updateSetResponse.error && (
        <ErrorText>{errorMessages.sets.updateError}</ErrorText>
      )}
      {updateSetResponse.loading && (
        <InformationText>{UPDATE_SET_LOADING_MESSAGE}</InformationText>
      )}
      <style jsx>
        {`
          .button-align {
            width: 100%;
            text-align: center;
          }

          .input-align {
            display: flex;
            justify-content: space-around;
            padding: 16px;
          }

          .input {
            margin: 8px;
          }
        `}
      </style>
    </div>
  );
};

Sets.propTypes = {
  exerciseID: string.isRequired,
  metrics: string.isRequired,
};
export default Sets;
