import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useState } from 'react';

import { Button, ExercisesList, ExerciseSelect } from '../../components';

export const LOADING_MESSAGE = 'loading exercises';
export const ERROR_MESSAGE = 'error fetching exercises';


const ButtonWrapper = styled.div`
  text-align: center;
`;

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

// TODO: populate from API
const exerciseOptions = [
  { name: 'Treadmill', value: 'TREADMILL' },
  { name: 'Leg press left leg', value: 'LEG_PRESS_LEFT_LEG' },
  { name: 'Leg press right leg', value: 'LEG_PRESS_RIGHT_LEG' },
  { name: 'Leg press both legs', value: 'LEG_PRESS_BOTH_LEGS' },
  { name: 'Hamstring curls left leg', value: 'HAMSTRING_CURL_LEFT_LEG' },
  { name: 'Hamstring curls right leg', value: 'HAMSTRING_CURL_RIGHT_LEG' },
  { name: 'Hamstring curls both legs', value: 'HAMSTRING_CURL_BOTH_LEGS' },
  { name: 'Exercise bike', value: 'SPINNING_BIKE' },
  { name: 'Squats', value: 'SQUAT' },
  { name: 'Deadlift', value: 'DEADLIFT' }
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
