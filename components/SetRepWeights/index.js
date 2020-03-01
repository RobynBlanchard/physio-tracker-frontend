import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useState } from 'react';
import { InputBlock, Table, Button } from '../index';

const GET_SETS = gql`
  query($exerciseID: ID!) {
    sets(exerciseID: $exerciseID) {
      id
      weight
      reps
    }
  }
`;

const SetRepWeights = ({ exerciseID }) => {
  const [inputWeight, setInputWeight] = useState();
  const [inputReps, setInputReps] = useState();
  const { loading, error, data } = useQuery(GET_SETS, {
    variables: { exerciseID: exerciseID }
  });

  const tableHeadings = [
    { colID: 'weight', name: 'Weight (kg)' },
    { colID: 'reps', name: 'Reps' }
  ];

  return (
    <div>
      <Table tableHeadings={tableHeadings} rowData={data.sets} />

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
        <Button>Add set +</Button>
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
