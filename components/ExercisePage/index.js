import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useState } from 'react';

import { Button, ExercisesList, ExerciseSelect } from '../../components';

const ButtonWrapper = styled.div`
  text-align: center;
`;

// const GET_EXERCISES = gql`
//   query($sessionID: ID!) {
//     exercises(sessionID: $sessionID) {
//       # id
//       # name
//       ... on TimeDistanceExercise {
//         timedistancename: name
//         id
//       }
//       ... on FreeWeightExercise {
//         freewieghtname: name
//         id
//       }

//       ... on WeightMachineExercise {
//         weightname: name
//         id
//       }
//     }
//   }
// `;

const CREATE_EXERCISE = gql`
  mutation createExercise($data: CreateExerciseInput!) {
    createExercise(data: $data) {
      id
      name
    }
  }
`;

// TODO: populate from API
const exerciseOptions = [
  { name: 'Treadmill', value: 'Treadmill' },
  { name: 'Leg press', value: 'Leg press' },
  { name: 'Leg extension', value: 'Leg extension' },
  { name: 'Hamstring curls', value: 'Hamstring curls' },
  { name: 'Exercise bike', value: 'Exercise bike' },
  { name: 'Squats', value: 'Squats' },
  { name: 'Deadlift', value: 'Deadlift' }
];

const ExercisePage = ({ sessionID }) => {
  const { loading, error, data } = useQuery(GET_EXERCISES, {
    variables: { sessionID: sessionID }
  });

  const [addExercise, addExericseResponse] = useMutation(CREATE_EXERCISE);
  const [exerciseOption, setExerciseOption] = useState(
    exerciseOptions[0].value
  );

  const handleAddExercise = () => {
    return addExercise({
      variables: {
        data: { session: sessionID.toString(), name: exerciseOption }
      },
      refetchQueries: [
        {
          query: GET_EXERCISES,
          variables: { sessionID: sessionID }
        }
      ]
    });
  };

  if (loading) return <div>{LOADING_MESSAGE}</div>;
  if (error) return <div>{ERROR_MESSAGE}</div>;

  return (
    <>
      <ExercisesList exercises={data && data.exercises} />
      {addExericseResponse.error && (
        <div>{addExericseResponse.error.message}</div>
      )}
      {addExericseResponse.loading && <div>loading</div>}
      <ExerciseSelect
        onChange={e => setExerciseOption(e.target.value)}
        exerciseOptions={exerciseOptions}
      />
      <ButtonWrapper>
        <Button onClick={() => handleAddExercise()}>Add exercise +</Button>
      </ButtonWrapper>
    </>
  );
};

export default ExercisePage;
