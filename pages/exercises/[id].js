import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useState } from 'react';
import { useRouter } from 'next/router';

import {
  Layout,
  Button,
  ExercisesList,
  ExerciseSelect
} from '../../components';

const GET_EXERCISES = gql`
  query($sessionID: ID!) {
    exercises(sessionID: $sessionID) {
      id
      name
    }
  }
`;

const CREATE_EXERCISE = gql`
  mutation createExercise($data: CreateExerciseInput!) {
    createExercise(data: $data) {
      id
      name
    }
  }
`;

const exerciseOptions = [
  { name: 'Treadmill', value: 'Treadmill' },
  { name: 'Leg press', value: 'Leg press' },
  { name: 'Leg extension', value: 'Leg extension' },
  { name: 'Hamstring curls', value: 'Hamstring curls' },
  { name: 'Exercise bike', value: 'Exercise bike' },
  { name: 'Squats', value: 'Squats' },
  { name: 'Deadlift', value: 'Deadlift' }
];

const Exercises = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(GET_EXERCISES, {
    variables: { sessionID: id }
  });
  const [addExercise, addExericseResponse] = useMutation(CREATE_EXERCISE);
  const [exerciseOption, setExerciseOption] = useState(
    exerciseOptions[0].value
  );

  const handleAddExercise = () => {
    return addExercise({
      variables: { data: { session: id.toString(), name: exerciseOption } },
      refetchQueries: [
        {
          query: GET_EXERCISES,
          variables: { sessionID: id }
        }
      ]
    });
  };

  if (loading) return <div>loading</div>;
  if (error) return <div>error fetching exercises</div>;

  return (
    <Layout title={'Your workout'}>
      <ExercisesList exercises={data && data.exercises} />
      {addExericseResponse.error && (
        <div>{addExericseResponse.error.message}</div>
      )}
      {addExericseResponse.loading && <div>loading</div>}
      <div className="select-align">
        <ExerciseSelect
          onChange={e => setExerciseOption(e.target.value)}
          exerciseOptions={exerciseOptions}
        />
      </div>
      <div className="button-align">
        <Button onClick={() => handleAddExercise()}>Add exercise +</Button>
      </div>
      <style jsx>{`
        .button-align {
          text-align: center;
        }

        .select-align {
          padding: 20px;
          text-align: center;
        }
      `}</style>
    </Layout>
  );
};

export default Exercises;
