import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useState } from 'react';
import { InputBlock, Table, Button } from '../index';

const GET_SETS = gql`
  query($exerciseID: ID!) {
    sets(exerciseID: $exerciseID) {
      ... on TimeDistanceSet {
        time
        distance
        id
      }
    }
  }
`;

const CREATE_SET = gql`
  mutation createSet($data: CreateSetInput!) {
    createSet(data: $data) {
      id
    }
  }
`;

const Sets = ({ exerciseID }) => {
  const [inputTime, setInputTime] = useState();
  const [inputDistance, setInputDistance] = useState();
  const [addSet, addSetResponse] = useMutation(CREATE_SET);
  const { loading, error, data } = useQuery(GET_SETS, {
    variables: { exerciseID: exerciseID }
  });

  const handleAddSet = () => {
    return addSet({
      variables: {
        data: { exercise: exerciseID, time: inputTime, distance: inputDistance }
      },
      refetchQueries: [
        {
          query: GET_SETS,
          variables: { exerciseID: exerciseID }
        }
      ]
    });
  };

  const tableHeadings = [
    { colID: 'time', name: 'Time (mins)' },
    { colID: 'distance', name: 'Distance (km)' }
  ];

  if (loading) return <div>Loading</div>;
  if (error) return <div>error</div>;

  return (
    <div>
      <Table tableHeadings={tableHeadings} rowData={data.sets} />

      <div className="input-align">
        <InputBlock
          label="Time"
          onChange={e => setInputTime(parseInt(e.target.value, 10))}
        />
        <InputBlock
          label="Distance"
          onChange={e => setInputDistance(parseInt(e.target.value, 10))}
        />
      </div>

      <div className="button-align">
        <Button onClick={handleAddSet}>Add Set +</Button>
      </div>
      {addSetResponse.error && <div>{addSetResponse.error.message}</div>}
      {addSetResponse.loading && <div>loading</div>}
      <style jsx>{`
        .button-align {
          width: 100%;
          text-align: center;
        }

        .input-align {
          display: flex;
          justify-content: space-around;
          padding: 16px;
        }
      `}</style>
    </div>
  );
};

export default Sets;
