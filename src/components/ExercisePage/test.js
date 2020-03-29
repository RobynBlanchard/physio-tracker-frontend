import { MockedProvider } from '@apollo/react-testing';
import { mount } from 'enzyme';
// The component AND the query need to be exported
import ExercisePage, { GET_EXERCISES } from './';

const mocks = [
  {
    request: {
      query: GET_EXERCISES,
      variables: {
        sessionID: "1"
      }
    },
    result: {
      data: {
        exercises: []
      }
    }
  }
];

it('renders without error', () => {
  mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ExercisePage sessionID="1" />
    </MockedProvider>
  );
});

// TODO:
