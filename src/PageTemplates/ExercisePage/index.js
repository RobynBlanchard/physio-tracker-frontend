import styled from 'styled-components';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { string } from 'prop-types';
import AriaModal from 'react-aria-modal';
import {
  Button,
  ExercisesList,
  ExerciseSelect,
  InformationText,
  ErrorText,
  CreateExercise,
} from '../../components';
import mapExerciseToSets from '../../util/mapExerciseToSetType';

export const LOADING_MESSAGE = 'loading exercises';
export const ERROR_MESSAGE = 'error fetching exercises';

export const ADD_EXERCISE_LOADING_MESSAGE = 'adding exercise';
export const ADD_EXERCISE_ERROR_MESSAGE = 'error adding exercise';

export const DELETE_EXERCISE_LOADING_MESSAGE = 'deleting exercise';
export const DELETE_EXERCISE_ERROR_MESSAGE = 'error deleting exercise';

const ButtonWrapper = styled.div`
  text-align: center;
`;

export const GET_EXERCISES = gql`
  query exercises($sessionID: ID!) {
    exercises(sessionID: $sessionID) {
      id
      name
      metrics
    }
  }
`;

export const CREATE_EXERCISE = gql`
  mutation createExercise($data: CreateExerciseInput!) {
    createExercise(data: $data) {
      id
      name
      metrics
    }
  }
`;

export const DELETE_EXERCISE = gql`
  mutation deleteExercise($id: ID!) {
    deleteExercise(id: $id) {
      id
      name
    }
  }
`;

// TODO- change exercise name to take any name
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
  { name: 'Deadlift', value: 'DEADLIFT' },
];

// set columns attached to exercise?
const ExercisePage = ({ sessionID }) => {
  const [displayModal, setDisplayModal] = useState(false);
  const { loading, error, data } = useQuery(GET_EXERCISES, {
    variables: { sessionID },
  });

  const [addExercise, addExerciseResponse] = useMutation(CREATE_EXERCISE);
  const [deleteExercise, deleteExerciseResponse] = useMutation(DELETE_EXERCISE);

  const [exerciseOption, setExerciseOption] = useState(
    exerciseOptions[0].value
  );

  const handleDeleteExercise = (id) =>
    deleteExercise({
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: GET_EXERCISES,
          variables: { sessionID },
        },
      ],
    });

  const handleAddExercise = (exerciseName, allMetrics) => {
    debugger
    addExercise({
      variables: {
        data: {
          session: sessionID.toString(),
          name: exerciseName,
          metrics: allMetrics,
        },
      },
      refetchQueries: [
        {
          query: GET_EXERCISES,
          variables: { sessionID },
        },
      ],
    });
  };

  const getApplicationNode = () => {
    return document.getElementById('__next');
  };

  if (loading) return <InformationText>{LOADING_MESSAGE}</InformationText>;
  if (error) return <ErrorText>{ERROR_MESSAGE}</ErrorText>;
  console.log(data && data.exercises)
  return (
    <>
      <ExercisesList
        exercises={data && data.exercises}
        deleteExercise={handleDeleteExercise}
      />
      {displayModal && (
        <AriaModal
          titleText="demo one"
          onExit={() => setDisplayModal(false)}
          initialFocus="#thing"
          getApplicationNode={getApplicationNode}
          underlayStyle={{ paddingTop: '2em' }}
        >
          <CreateExercise handleAddCustomExercise={handleAddExercise} />
        </AriaModal>
      )}

      {addExerciseResponse.error && (
        <ErrorText>{ADD_EXERCISE_ERROR_MESSAGE}</ErrorText>
      )}
      {addExerciseResponse.loading && (
        <InformationText>{ADD_EXERCISE_LOADING_MESSAGE}</InformationText>
      )}
      {deleteExerciseResponse.error && (
        <ErrorText>{DELETE_EXERCISE_ERROR_MESSAGE}</ErrorText>
      )}
      {deleteExerciseResponse.loading && (
        <InformationText>{DELETE_EXERCISE_LOADING_MESSAGE}</InformationText>
      )}
      <ExerciseSelect
        onChange={(e) => setExerciseOption(e.target.value)}
        exerciseOptions={exerciseOptions}
      />
      <ButtonWrapper>
        <Button
          id="add-new-exercise"
          onClick={() =>
            handleAddExercise(exerciseOption, mapExerciseToSets[exerciseOption])
          }
        >
          Add exercise +
        </Button>
      </ButtonWrapper>
      <ButtonWrapper>
        <Button onClick={() => setDisplayModal(true)}>
          Add custom exercise
        </Button>
      </ButtonWrapper>
    </>
  );
};

ExercisePage.propTypes = {
  sessionID: string.isRequired,
};

export default ExercisePage;
