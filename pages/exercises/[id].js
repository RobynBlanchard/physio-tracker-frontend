import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { useRouter } from 'next/router';

import { Layout, Button, ExercisesList } from '../../components';

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


// Exercises
// - id
// - exerciseType

// ExerciseType
// - of several types

// SetsType
// - sets

// Running
// - Distance, Time

// etc...


const Exercises = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(GET_EXERCISES, {
    variables: { sessionID: id }
  });
  const [addExercise, addExericseResponse] = useMutation(CREATE_EXERCISE);

  const handleAddExercise = () => {
    return addExercise({
      variables: { data: { session: id, name: 'treadmill' } },
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
      <div className="button-align">
        <Button onClick={() => handleAddExercise()}>Add exercise +</Button>
      </div>
      <style jsx>{`
        .button-align {
          width: 100%;
          text-align: center;
        }
      `}</style>
    </Layout>
  );
};

export default Exercises;
