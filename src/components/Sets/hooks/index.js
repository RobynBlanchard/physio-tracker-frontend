import { gql } from 'apollo-boost';

export const GET_SETS = gql`
  query($exerciseID: ID!) {
    sets(exerciseID: $exerciseID) {
      time
      distance
      reps
      weight
      id
    }
  }
`;

export const CREATE_SET = gql`
  mutation createSet($data: CreateSetInput!) {
    createSet(data: $data) {
      time
      distance
      reps
      weight
      id
    }
  }
`;

export const DELETE_SET = gql`
  mutation deleteSet($id: ID!) {
    deleteSet(id: $id) {
      id
      time
      distance
      reps
      weight
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
