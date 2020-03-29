import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useState } from 'react';
import { InputBlock, Table, Button } from '../index';
import { InformationText, ErrorText } from '../../styles';

const GET_SETS = gql`
  query($exerciseID: ID!) {
    sets(exerciseID: $exerciseID) {
      id
      weight
      reps
    }
  }
`;

const CREATE_SET = gql`
  mutation createSet($data: CreateSetInput!) {
    createSet(data: $data) {
      id
      weight
      reps
    }
  }
`;

const SetRepWeights = ({ exerciseID }) => {
  const [inputWeight, setInputWeight] = useState();
  const [inputReps, setInputReps] = useState();
  const [addSet, addSetResponse] = useMutation(CREATE_SET);
  const { loading, error, data } = useQuery(GET_SETS, {
    variables: { exerciseID: exerciseID }
  });

  const tableHeadings = [
    { colID: 'weight', name: 'Weight (kg)' },
    { colID: 'reps', name: 'Reps' }
  ];

  const handleAddSet = () => {
    return addSet({
      variables: {
        data: { exercise: exerciseID, weight: inputWeight, reps: inputReps }
      },
      refetchQueries: [
        {
          query: GET_SETS,
          variables: { exerciseID: exerciseID }
        }
      ]
    });
  };

  if (loading) return <InformationText>Loading</InformationText>;
  if (error) return <ErrorText>error</ErrorText>;

  return (
    <div>
      <Table tableHeadings={tableHeadings} rowData={data && data.sets} />

      <div className="input-align">
        <InputBlock
          label="Weight"
          onChange={e => setInputWeight(parseFloat(e.target.value, 10))}
        />
        <InputBlock
          label="Reps"
          onChange={e => setInputReps(parseInt(e.target.value, 10))}
        />
      </div>
      <div className="button-align">
        <Button onClick={handleAddSet}>Add Set +</Button>
        {addSetResponse.error && <ErrorText>{addSetResponse.error.message}</ErrorText>}
        {addSetResponse.loading && <InformationText>loading</InformationText>}
      </div>
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

export default SetRepWeights;
