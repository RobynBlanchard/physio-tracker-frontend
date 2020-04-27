import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useState } from 'react';
import { string } from 'prop-types';
import InputBlock from '../InputBlock';
import Table from '../Table';
import Button from '../Button';
import InformationText from '../InformationText';
import ErrorText from '../ErrorText';

export const LOADING_MESSAGE = 'loading sets';
export const ERROR_MESSAGE = 'error fetching sets';

export const ADD_SET_LOADING_MESSAGE = 'adding set';
export const ADD_SET_ERROR_MESSAGE = 'sorry could not add set';

export const DELETE_SET_LOADING_MESSAGE = 'deleting set';
export const DELETE_SET_ERROR_MESSAGE = 'sorry could not delete set';

export const UPDATE_SET_LOADING_MESSAGE = 'updating set';
export const UPDATE_SET_ERROR_MESSAGE = 'sorry could not update set';

export const GET_SETS = gql`
  query($exerciseID: ID!) {
    sets(exerciseID: $exerciseID) {
      time
      distance
      id
    }
  }
`;

export const CREATE_SET = gql`
  mutation createSet($data: CreateSetInput!) {
    createSet(data: $data) {
      id
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

export const DELETE_SET = gql`
  mutation deleteSet($id: ID!) {
    deleteSet(id: $id) {
      id
      time
      distance
    }
  }
`;

// TODO: merge with set rep weights!

const Sets = ({ exerciseID }) => {
  const [inputTime, setInputTime] = useState();
  const [editSets, setEditSets] = useState(false);

  const [inputDistance, setInputDistance] = useState();
  const [addSet, addSetResponse] = useMutation(CREATE_SET);
  const { loading, error, data } = useQuery(GET_SETS, {
    variables: { exerciseID },
  });
  const [updateSet, updateSetResponse] = useMutation(UPDATE_SET);
  const [deleteSet, deleteSetResponse] = useMutation(DELETE_SET);

  const handleAddSet = () =>
    addSet({
      variables: {
        data: {
          exercise: exerciseID,
          time: inputTime,
          distance: inputDistance,
        },
      },
      refetchQueries: [
        {
          query: GET_SETS,
          variables: { exerciseID },
        },
      ],
    });

  const handleEdit = (row) => {
    const { id, time, distance } = row;

    return updateSet({
      variables: { id, data: { time, distance } },
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

  const tableHeadings = [
    { colID: 'time', name: 'Time (mins)' },
    { colID: 'distance', name: 'Distance (km)' },
  ];

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
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        editSets={editSets}
        tableHeadings={tableHeadings}
        rowData={(data && data.sets) || []}
      />
      <div className="input-align">
        <InputBlock
          id="input-new-time"
          label="Time"
          onChange={(e) => setInputTime(parseFloat(e.target.value))}
        />
        <InputBlock
          id="input-new-distance"
          label="Distance"
          onChange={(e) => setInputDistance(parseFloat(e.target.value))}
        />
      </div>

      <div className="button-align">
        <Button id="add-set" onClick={handleAddSet}>
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
};

export default Sets;
