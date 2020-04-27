import { MockedProvider } from '@apollo/react-testing';
import { act } from 'react-dom/test-utils';
import { mountWithTheme } from '../../util/testing/theme';
import ExercisePage, {
  GET_EXERCISES,
  CREATE_EXERCISE,
  DELETE_EXERCISE,
  LOADING_MESSAGE,
  ERROR_MESSAGE,
  ADD_EXERCISE_LOADING_MESSAGE,
  ADD_EXERCISE_ERROR_MESSAGE,
  DELETE_EXERCISE_ERROR_MESSAGE,
} from '.';
import { updateWrapper } from '../../util/testing/act';

import { ExercisesList, ExerciseSelect, InformationText, ErrorText } from '..';

const sessionID = '1';
// eslint-disable-next-line jest/expect-expect
it('renders without error', async () => {
  const mocks = [
    {
      request: {
        query: GET_EXERCISES,
        variables: { sessionID },
      },
      result: { data: { exercises: [] } },
    },
  ];

  await act(async () => {
    mountWithTheme(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ExercisePage sessionID={sessionID} />
      </MockedProvider>
    );
  });
});

it('renders loading state initially', async () => {
  await act(async () => {
    const component = mountWithTheme(
      <MockedProvider mocks={[]}>
        <ExercisePage sessionID={sessionID} />
      </MockedProvider>
    );

    expect(component.find(InformationText)).toHaveLength(1);
    expect(component.find(InformationText).text()).toContain(LOADING_MESSAGE);
    expect(component.find(ERROR_MESSAGE)).toHaveLength(0);
    expect(component.find(ExercisesList)).toHaveLength(0);
  });
});

describe('fetching exercises', () => {
  it('renders ExercisesList when the get exercises query is successful', async () => {
    const exercises = [
      { id: '1', name: 'TREADMILL' },
      { id: '2', name: 'HAMSTRING_CURLS' },
    ];

    const mock = {
      request: {
        query: GET_EXERCISES,
        variables: { sessionID },
      },
      result: {
        data: { exercises },
      },
    };

    const component = mountWithTheme(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <ExercisePage sessionID={sessionID} />
      </MockedProvider>
    );

    await updateWrapper(component);

    expect(component.find(InformationText)).toHaveLength(0);
    expect(component.find(ErrorText)).toHaveLength(0);
    const exerciseList = component.find(ExercisesList);
    expect(exerciseList).toHaveLength(1);
    expect(exerciseList.prop('exercises')).toEqual(exercises);
  });

  it('displays an error message when the query is unsuccessful', async () => {
    const mock = {
      request: {
        query: GET_EXERCISES,
      },
      error: new Error('Could not fetch exercises'),
    };

    const component = mountWithTheme(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <ExercisePage sessionID={sessionID} />
      </MockedProvider>
    );

    await updateWrapper(component);

    expect(component.find(ErrorText)).toHaveLength(1);
    expect(component.find(ErrorText).text()).toContain(ERROR_MESSAGE);
    expect(component.find(InformationText)).toHaveLength(0);

    expect(component.find(ExercisesList)).toHaveLength(0);
  });
});

describe('adding an exercise', () => {
  describe('when the mutation is successful', () => {
    it('calls create exercise mutation and displays refetched exercises', async () => {
      const newExercise = { id: '1', name: 'LEG_PRESS' };

      const mockGetExercises = {
        request: {
          query: GET_EXERCISES,
          variables: { sessionID },
        },
        result: {
          data: { exercises: [] },
        },
      };

      const mockCreateExercise = {
        request: {
          query: CREATE_EXERCISE,
          variables: { data: { name: newExercise.name, session: sessionID } },
        },
        result: { data: newExercise },
      };

      const mockRefreshedGetExercises = {
        request: {
          query: GET_EXERCISES,
          variables: { sessionID },
        },
        result: {
          data: { exercises: [newExercise] },
        },
      };

      const mocks = [
        mockGetExercises,
        mockCreateExercise,
        mockRefreshedGetExercises,
      ];

      const component = mountWithTheme(
        <MockedProvider mocks={mocks} addTypename={false}>
          <ExercisePage sessionID={sessionID} />
        </MockedProvider>
      );

      await updateWrapper(component);

      expect(component.find(ExercisesList).prop('exercises')).toHaveLength(0);

      act(() => {
        component
          .find(ExerciseSelect)
          .find('select')
          .simulate('change', { target: { value: newExercise.name } });
      });

      await updateWrapper(component);

      component.find('button').find('#add-new-exercise').simulate('click');

      expect(component.find(InformationText)).toHaveLength(1);
      expect(component.find(InformationText).text()).toContain(
        ADD_EXERCISE_LOADING_MESSAGE
      );

      await updateWrapper(component);

      expect(component.find(ExercisesList).prop('exercises')).toHaveLength(1);
      expect(component.find(ExercisesList).prop('exercises')[0]).toEqual(
        newExercise
      );

      expect(component.find(InformationText)).toHaveLength(0);
      expect(component.find(ErrorText)).toHaveLength(0);
    });
  });

  describe('when the mutation is unsuccessful', () => {
    it('calls create session mutation and displays error', async () => {
      const newExercise = { id: '1', name: 'LEG_PRESS' };

      const mockGetExercises = {
        request: {
          query: GET_EXERCISES,
          variables: { sessionID },
        },
        result: {
          data: { exercises: [] },
        },
      };

      const mockCreateExercise = {
        request: {
          query: CREATE_EXERCISE,
          variables: { data: { name: newExercise.name, session: sessionID } },
        },
        result: { errors: [{ message: 'Could not create exercise' }] },
      };

      const mocks = [mockGetExercises, mockCreateExercise, mockGetExercises];

      const component = mountWithTheme(
        <MockedProvider
          mocks={mocks}
          addTypename={false}
          defaultOptions={{
            mutate: {
              errorPolicy: 'all',
            },
          }}
        >
          <ExercisePage sessionID={sessionID} />
        </MockedProvider>
      );

      await updateWrapper(component);

      expect(component.find(ExercisesList).prop('exercises')).toHaveLength(0);

      act(() => {
        component
          .find(ExerciseSelect)
          .find('select')
          .simulate('change', { target: { value: newExercise.name } });
      });

      await updateWrapper(component);
      component.find('button').find('#add-new-exercise').simulate('click');

      expect(component.find(InformationText)).toHaveLength(1);
      expect(component.find(InformationText).text()).toContain(
        ADD_EXERCISE_LOADING_MESSAGE
      );

      await updateWrapper(component);

      expect(component.find(ErrorText)).toHaveLength(1);
      expect(component.find(ErrorText).text()).toContain(
        ADD_EXERCISE_ERROR_MESSAGE
      );
      expect(component.find(ExercisesList).prop('exercises')).toHaveLength(0);
      expect(component.find(InformationText)).toHaveLength(0);
    });
  });
});

describe('deleting an exercise', () => {
  describe('when the mutation is successful', () => {
    it('removes the exercise from the list', async () => {
      const exercise = { id: '1', name: 'LEG_PRESS' };

      const mockGetExercises = {
        request: {
          query: GET_EXERCISES,
          variables: { sessionID },
        },
        result: {
          data: { exercises: [exercise] },
        },
      };

      const mockDeleteExercise = {
        request: {
          query: DELETE_EXERCISE,
          variables: { id: '1' },
        },
        result: { data: exercise },
      };

      const mockRefreshGetExercises = {
        request: {
          query: GET_EXERCISES,
          variables: { sessionID },
        },
        result: {
          data: { exercises: [] },
        },
      };

      const mocks = [
        mockGetExercises,
        mockDeleteExercise,
        mockRefreshGetExercises,
      ];

      const component = mountWithTheme(
        <MockedProvider mocks={mocks} addTypename={false}>
          <ExercisePage sessionID={sessionID} />
        </MockedProvider>
      );

      await updateWrapper(component);
      expect(component.find(ExercisesList).prop('exercises')).toHaveLength(1);

      act(() => {
        component.find(ExercisesList).prop('deleteExercise')('1');
      });

      // TODO
      // expect(component.find(InformationText).length).toEqual(1);
      // expect(component.find(InformationText).text()).toContain(
      //   DELETE_EXERCISE_LOADING_MESSAGE
      // );
      await updateWrapper(component);

      expect(component.find(ExercisesList).prop('exercises')).toHaveLength(0);
      expect(component.find(ErrorText)).toHaveLength(0);

      expect(component.find(InformationText)).toHaveLength(0);
    });
  });

  describe('when the mutation is unsuccessful', () => {
    it('renders an error and does not remove any exercises', async () => {
      const exercise = { id: '1', name: 'LEG_PRESS' };

      const mockGetExercises = {
        request: {
          query: GET_EXERCISES,
          variables: { sessionID },
        },
        result: {
          data: { exercises: [exercise] },
        },
      };

      const mockDeleteExercise = {
        request: {
          query: DELETE_EXERCISE,
          variables: { id: '1' },
        },
        result: { errors: [{ message: 'Could not delete exercise' }] },
      };

      const mocks = [mockGetExercises, mockDeleteExercise, mockGetExercises];

      const component = mountWithTheme(
        <MockedProvider
          mocks={mocks}
          addTypename={false}
          defaultOptions={{
            mutate: {
              errorPolicy: 'all',
            },
          }}
        >
          <ExercisePage sessionID={sessionID} />
        </MockedProvider>
      );

      await updateWrapper(component);
      expect(component.find(ExercisesList).prop('exercises')).toHaveLength(1);

      act(() => {
        component.find(ExercisesList).prop('deleteExercise')('1');
      });
      // expect(component.find(InformationText)).toHaveLength(1);

      await updateWrapper(component);

      expect(component.find(ExercisesList).prop('exercises')).toHaveLength(1);
      expect(component.find(ErrorText)).toHaveLength(1);
      expect(component.find(ErrorText).text()).toContain(
        DELETE_EXERCISE_ERROR_MESSAGE
      );
      expect(component.find(InformationText)).toHaveLength(0);
    });
  });
});
