import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { string } from 'prop-types';

import styled from 'styled-components';
import Table from '../Table';
import Button from '../Button';
import InformationText from '../InformationText';
import ErrorText from '../ErrorText';

import useForm from '../../customHooks/useForm';

export const LOADING_MESSAGE = 'loading sets';
export const ERROR_MESSAGE = 'error fetching sets';

export const ADD_SET_LOADING_MESSAGE = 'adding set';
export const ADD_SET_ERROR_MESSAGE = 'sorry could not add set';

export const DELETE_SET_LOADING_MESSAGE = 'deleting set';
export const DELETE_SET_ERROR_MESSAGE = 'sorry could not delete set';

export const UPDATE_SET_LOADING_MESSAGE = 'updating set';
export const UPDATE_SET_ERROR_MESSAGE = 'sorry could not update set';

export const Label = styled.label`
  display: block;
  margin: 4px 0;
  color: ${({ theme }) => theme.colors.white};
`;

export const Input = styled.input`
  display: block;
  height: 34px;
  width: 60px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.darkestGrey};
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
`;

export const GET_SETS = gql`
  query($exerciseID: ID!) {
    sets(exerciseID: $exerciseID) {
      time
      distance
      reps
      weight
      id
    }
  }
`;

export const CREATE_SET = gql`
  mutation createSet($data: CreateSetInput!) {
    createSet(data: $data) {
      time
      distance
      reps
      weight
      id
    }
  }
`;

export const DELETE_SET = gql`
  mutation deleteSet($id: ID!) {
    deleteSet(id: $id) {
      id
      time
      distance
      reps
      weight
    }
  }
`;

export const UPDATE_SET = gql`
  mutation updateSet($id: ID!, $data: updateSetInput) {
    updateSet(id: $id, data: $data) {
      id
      time
      distance
    }
  }
`;

const Sets = ({ exerciseID, metrics }) => {
  console.log('exerciseID', exerciseID)
  console.log('metrics', metrics)

  const formattedHeadings = metrics.toLowerCase().split(',');
  const [editSets, setEditSets] = useState(false);

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

    return updateSet({
      variables: { id, data: rest },
      refetchQueries: [
        {
          query: GET_SETS,
          variables: { exerciseID },
        },
      ],
    });
  };

  const { inputs, handleInputChange, handleSubmit } = useForm({}, handleAddSet);

  const headings = formattedHeadings.map((metricName) => ({
    colID: metricName,
    name: metricName,
  }));

  if (loading) return <InformationText>{LOADING_MESSAGE}</InformationText>;
  if (error) return <ErrorText>{ERROR_MESSAGE}</ErrorText>;

  return (
    <div>
      {data && data.sets.length > 0 && (
        <button type="button" onClick={() => setEditSets((prev) => !prev)}>
          Edit
        </button>
      )}
      <Table
        rowData={(data && data.sets) || []}
        tableHeadings={headings}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        editSets={editSets}
      />
      <div className="input-align">
        {formattedHeadings.map((heading) => (
          <React.Fragment key={`input${heading}`}>
            <Label>{heading}</Label>
            <Input
              id={`input${heading}`}
              label={heading}
              name={`input${heading}`}
              onChange={handleInputChange}
              value={inputs[heading]}
            />
          </React.Fragment>
        ))}
      </div>
      <div className="button-align">
        <Button id="add-set" type="submit" onClick={handleSubmit}>
          Add Set +
        </Button>
      </div>
      {addSetResponse.error && <ErrorText>{ADD_SET_ERROR_MESSAGE}</ErrorText>}
      {addSetResponse.loading && (
        <InformationText>{ADD_SET_LOADING_MESSAGE}</InformationText>
      )}
      {deleteSetResponse.error && (
        <ErrorText>{DELETE_SET_ERROR_MESSAGE}</ErrorText>
      )}
      {deleteSetResponse.loading && (
        <InformationText>{DELETE_SET_LOADING_MESSAGE}</InformationText>
      )}
      {updateSetResponse.error && (
        <ErrorText>{UPDATE_SET_ERROR_MESSAGE}</ErrorText>
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
