import { gql } from 'apollo-boost';

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
