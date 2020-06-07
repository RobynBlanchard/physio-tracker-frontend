import { MockedProvider } from '@apollo/react-testing';
import { act } from 'react-dom/test-utils';
import AriaModal from 'react-aria-modal';
import { mountWithTheme } from '../../util/testing/theme';
import ExercisePage, { LOADING_MESSAGE, ADD_EXERCISE_LOADING_MESSAGE } from '.';
import { GET_EXERCISES, CREATE_EXERCISE, DELETE_EXERCISE } from './hooks';

import { updateWrapper } from '../../util/testing/act';
import {
  ExercisesList,
  ExerciseSelect,
  InformationText,
  ErrorText,
  Button,
  CreateExercise,
} from '../../components';
import { ButtonWrapper } from './style';
import errorMessages from '../../errors';

jest.mock('../../util/mapExerciseToSetType', () => ({
  LEG_PRESS: ['REPS', 'WEIGHT'],
}));

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
    expect(component.find(ErrorText)).toHaveLength(0);
    expect(component.find(ExercisesList)).toHaveLength(0);
  });
});

describe('fetching exercises', () => {
  it('renders ExercisesList when the get exercises query is successful', async () => {
    const exercises = [
      { id: '1', name: 'TREADMILL', metrics: ['TIME', 'DISTANCE'] },
      { id: '2', name: 'HAMSTRING_CURLS', metrics: ['REPS', 'WEIGHT'] },
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
    expect(component.find(ErrorText).text()).toContain(
      errorMessages.exercises.fetchError
    );
    expect(component.find(InformationText)).toHaveLength(0);

    expect(component.find(ExercisesList)).toHaveLength(0);
  });
});

describe('displaying the custom exercise modal', () => {
  let component;
  beforeEach(async () => {
    const mockGetExercises = {
      request: {
        query: GET_EXERCISES,
        variables: { sessionID },
      },
      result: {
        data: { exercises: [] },
      },
    };

    const mocks = [mockGetExercises];

    component = mountWithTheme(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ExercisePage sessionID={sessionID} />
      </MockedProvider>
    );

    await updateWrapper(component);
    component.find(ButtonWrapper).find(Button).simulate('click');
  });

  it('displays the custom exercise modal on click of the add custom exercise button', async () => {
    expect(component.find(AriaModal)).toHaveLength(1);
  });

  it('closes the modal when closeModal on CreateExercise is called', async () => {
    component.find(CreateExercise).prop('closeModal')();
    await updateWrapper(component);

    expect(component.find(AriaModal)).toHaveLength(0);
  });

  it('closes the modal when onExit on AriaModal is called', async () => {
    component.find(AriaModal).prop('onExit')();
    await updateWrapper(component);

    expect(component.find(AriaModal)).toHaveLength(0);
  });
});

describe('adding an exercise from list', () => {
  describe('when the mutation is successful', () => {
    let component;
    let newExercise;
    beforeEach(async () => {
      newExercise = {
        id: '1',
        name: 'LEG_PRESS',
        metrics: ['REPS', 'WEIGHT'],
      };

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
          variables: {
            data: {
              name: newExercise.name,
              session: sessionID,
              metrics: newExercise.metrics,
            },
          },
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

      component = mountWithTheme(
        <MockedProvider mocks={mocks} addTypename={false}>
          <ExercisePage sessionID={sessionID} />
        </MockedProvider>
      );

      await updateWrapper(component);
    });
    describe('adding an exercise from the list', () => {
      it('calls create exercise mutation and displays refetched exercises', async () => {
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
        // ??
        await updateWrapper(component);

        expect(component.find(ExercisesList).prop('exercises')).toHaveLength(1);
        expect(component.find(ExercisesList).prop('exercises')[0]).toEqual(
          newExercise
        );

        expect(component.find(InformationText)).toHaveLength(0);
        expect(component.find(ErrorText)).toHaveLength(0);
      });
    });

    describe('adding a custom exercise', () => {
      it('calls create exercise mutation and displays refetched exercises', async () => {
        expect(component.find(ExercisesList).prop('exercises')).toHaveLength(0);
        component.find(ButtonWrapper).find(Button).simulate('click');
        component.find(CreateExercise).prop('handleAddCustomExercise')(
          newExercise.name,
          newExercise.metrics
        );

        await updateWrapper(component);
        await updateWrapper(component);

        expect(component.find(ExercisesList).prop('exercises')).toHaveLength(1);
        expect(component.find(ExercisesList).prop('exercises')[0]).toEqual(
          newExercise
        );

        expect(component.find(InformationText)).toHaveLength(0);
        expect(component.find(ErrorText)).toHaveLength(0);
      });
    });
  });

  describe('when the mutation is unsuccessful', () => {
    it('calls create exercise mutation and displays error', async () => {
      const newExercise = {
        id: '1',
        name: 'LEG_PRESS',
        metrics: ['REPS', 'WEIGHT'],
      };

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
          variables: {
            data: {
              name: newExercise.name,
              session: sessionID,
              metrics: newExercise.metrics,
            },
          },
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
        errorMessages.exercises.createError
      );
      expect(component.find(ExercisesList).prop('exercises')).toHaveLength(0);
      expect(component.find(InformationText)).toHaveLength(0);
    });
  });
});

describe('deleting an exercise', () => {
  describe('when the mutation is successful', () => {
    it('removes the exercise from the list', async () => {
      const exercise = {
        id: '1',
        name: 'LEG_PRESS',
        metrics: ['REPS', 'WEIGHT'],
      };

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
      await updateWrapper(component);

      expect(component.find(ExercisesList).prop('exercises')).toHaveLength(0);
      expect(component.find(ErrorText)).toHaveLength(0);

      expect(component.find(InformationText)).toHaveLength(0);
    });
  });

  describe('when the mutation is unsuccessful', () => {
    it('renders an error and does not remove any exercises', async () => {
      const exercise = {
        id: '1',
        name: 'LEG_PRESS',
        metrics: ['REPS', 'WEIGHT'],
      };

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
        errorMessages.exercises.deleteError
      );
      expect(component.find(InformationText)).toHaveLength(0);
    });
  });
});
