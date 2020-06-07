import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
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
import { GET_EXERCISES, CREATE_EXERCISE, DELETE_EXERCISE } from './hooks';
import {
  ButtonWrapper,
  ExerciseSelectWrapper,
  AddExerciseFromListButtonWrapper,
  AddExerciseFromListWrapper,
  AddNewExerciseWrapper,
  HeadingWithLine,
} from './style';
import errorMessages from '../../errors';

export const LOADING_MESSAGE = 'loading exercises';
export const ADD_EXERCISE_LOADING_MESSAGE = 'adding exercise';
export const DELETE_EXERCISE_LOADING_MESSAGE = 'deleting exercise';

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
    setDisplayModal(false);
  };

  const getApplicationNode = () => {
    return document.getElementById('__next');
  };

  if (loading) return <InformationText>{LOADING_MESSAGE}</InformationText>;
  if (error) return <ErrorText>{errorMessages.exercises.fetchError}</ErrorText>;

  return (
    <>
      <ExercisesList
        exercises={data && data.exercises}
        deleteExercise={handleDeleteExercise}
      />
      {displayModal && (
        <AriaModal
          titleText="Custom exercise"
          onExit={() => setDisplayModal(false)}
          initialFocus="#create-exercise"
          getApplicationNode={getApplicationNode}
          underlayStyle={{ paddingTop: '2em' }}
        >
          <CreateExercise
            closeModal={() => setDisplayModal(false)}
            handleAddCustomExercise={handleAddExercise}
          />
        </AriaModal>
      )}

      {addExerciseResponse.error && (
        <ErrorText>{errorMessages.exercises.createError}</ErrorText>
      )}
      {addExerciseResponse.loading && (
        <InformationText>{ADD_EXERCISE_LOADING_MESSAGE}</InformationText>
      )}
      {deleteExerciseResponse.error && (
        <ErrorText>{errorMessages.exercises.deleteError}</ErrorText>
      )}
      {deleteExerciseResponse.loading && (
        <InformationText>{DELETE_EXERCISE_LOADING_MESSAGE}</InformationText>
      )}
      <AddNewExerciseWrapper>
        <AddExerciseFromListWrapper>
          <ExerciseSelectWrapper>
            <ExerciseSelect
              onChange={(e) => setExerciseOption(e.target.value)}
              exerciseOptions={exerciseOptions}
            />
          </ExerciseSelectWrapper>

          <AddExerciseFromListButtonWrapper>
            <Button
              id="add-new-exercise"
              onClick={
                () =>
                  handleAddExercise(
                    exerciseOption,
                    mapExerciseToSets[exerciseOption]
                  )
                // eslint-disable-next-line react/jsx-curly-newline
              }
            >
              + Exercise from list
            </Button>
          </AddExerciseFromListButtonWrapper>
        </AddExerciseFromListWrapper>
        <HeadingWithLine>or</HeadingWithLine>
        <ButtonWrapper>
          <Button onClick={() => setDisplayModal(true)}>
            + Custom exercise
          </Button>
        </ButtonWrapper>
      </AddNewExerciseWrapper>
    </>
  );
};

ExercisePage.propTypes = {
  sessionID: string.isRequired,
};

export default ExercisePage;
