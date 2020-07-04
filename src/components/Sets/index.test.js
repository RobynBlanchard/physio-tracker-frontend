import React from 'react';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/react-testing';
import { mountWithTheme } from '../../util/testing/theme';
import { updateWrapper } from '../../util/testing/act';
import Sets, {
  LOADING_MESSAGE,
  ADD_SET_LOADING_MESSAGE,
  DELETE_SET_LOADING_MESSAGE,
  UPDATE_SET_LOADING_MESSAGE,
} from '.';
import { GET_SETS, CREATE_SET, DELETE_SET, UPDATE_SET } from './hooks';
import { ValidationErrorWrapper } from './style';
import errorMessages from '../../errors';
import FormInput from '../FormInput';

import Table from '../Table';

const exerciseID = '1';
const metrics = 'TIME,DISTANCE';

// eslint-disable-next-line jest/expect-expect
it('renders without error', async () => {
  const mocks = [
    {
      request: {
        query: GET_SETS,
        variables: { exerciseID },
      },
      result: {
        data: {
          sets: [],
        },
      },
    },
  ];

  await act(async () => {
    mountWithTheme(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Sets exerciseID={exerciseID} metrics={metrics} />
      </MockedProvider>
    );
  });
});

it('renders loading state initially', async () => {
  let component;
  await act(async () => {
    component = mountWithTheme(
      <MockedProvider mocks={[]}>
        <Sets exerciseID={exerciseID} metrics={metrics} />
      </MockedProvider>
    );
  });

  expect(component.find(Table)).toHaveLength(0);
  expect(component.text()).toContain(LOADING_MESSAGE);
  expect(component.text()).not.toContain(errorMessages.sets.fetchError);
});

describe('fetching sets', () => {
  describe('when the get sets query is successful', () => {
    let component;
    const setsData = [
      { id: '1', time: 28, distance: 5, reps: null, weight: null },
      { id: '2', time: 33, distance: 5.6, reps: null, weight: null },
    ];
    beforeEach(async () => {
      const mock = {
        request: {
          query: GET_SETS,
          variables: { exerciseID },
        },
        result: {
          data: { sets: setsData },
        },
      };

      component = mountWithTheme(
        <MockedProvider mocks={[mock]} addTypename={false}>
          <Sets exerciseID={exerciseID} metrics={metrics} />
        </MockedProvider>
      );

      await updateWrapper(component);
    });

    it('does not render an error or loading message', () => {
      expect(component.text()).not.toContain(LOADING_MESSAGE);
      expect(component.text()).not.toContain(errorMessages.sets.fetchError);
    });

    it('renders a table with the correct headings', () => {
      const setsTable = component.find(Table);
      expect(setsTable).toHaveLength(1);
      const expectedHeadings = [
        {
          colID: 'time',
          name: 'time',
        },
        {
          colID: 'distance',
          name: 'distance',
        },
      ];
      expect(setsTable.prop('tableHeadings')).toEqual(expectedHeadings);
    });

    it('renders a table with the correct data', () => {
      const setsTable = component.find(Table);
      expect(setsTable).toHaveLength(1);
      expect(setsTable.prop('rowData')).toEqual(setsData);
    });

    it('renders inputs for each set metric', () => {
      const input = component.find(FormInput);
      expect(input).toHaveLength(2);

      expect(input.at(0).prop('label')).toEqual('time');
      expect(input.at(0).prop('name')).toEqual('inputtime');
    });
  });

  describe('when the gets sets query is unsuccessful', () => {
    it('displays an error message', async () => {
      const mock = {
        request: {
          query: GET_SETS,
          variables: { exerciseID },
        },
        error: new Error('Could not fetch sets'),
      };

      const component = mountWithTheme(
        <MockedProvider mocks={[mock]} addTypename={false}>
          <Sets exerciseID={exerciseID} metrics={metrics} />
        </MockedProvider>
      );

      await updateWrapper(component);

      expect(component.text()).not.toContain(LOADING_MESSAGE);
      expect(component.text()).toContain(errorMessages.sets.fetchError);
      expect(component.find(Table)).toHaveLength(0);
    });
  });
});

describe('adding a set', () => {
  const addNewSet = async (component, newSetTime, newSetDistance) => {
    act(() => {
      component.find('input').find('#inputtime').prop('onChange')({
        target: { value: newSetTime, name: 'inputtime' },

        persist: jest.fn(),
      });
    });

    await updateWrapper(component);

    act(() => {
      component.find('input').find('#inputdistance').prop('onChange')({
        target: { value: newSetDistance, name: 'inputdistance' },
        persist: jest.fn(),
      });
    });

    await updateWrapper(component);

    act(() => {
      component.find('button').find('#add-set').simulate('click');
    });

    expect(component.text()).toContain(ADD_SET_LOADING_MESSAGE);
    await updateWrapper(component);
  };

  describe('when the mutation is successful', () => {
    it('calls create set mutation and displays refetched sets', async () => {
      const newSetID = '1';
      const newSetTime = 33;
      const newSetDistance = 5.6;
      const newSet = {
        id: newSetID,
        time: newSetTime,
        distance: newSetDistance,
        reps: null,
        weight: null,
      };

      const mockGetSets = {
        request: {
          query: GET_SETS,
          variables: { exerciseID },
        },
        result: {
          data: { sets: [] },
        },
      };

      const mockCreateSet = {
        request: {
          query: CREATE_SET,
          variables: {
            data: {
              exercise: exerciseID,
              time: newSetTime,
              distance: newSetDistance,
              reps: null,
              weight: null,
            },
          },
        },
        result: { data: newSet },
      };

      const mockRefreshedGetSets = {
        request: {
          query: GET_SETS,
          variables: { exerciseID },
        },
        result: {
          data: { sets: [newSet] },
        },
      };

      const mocks = [mockGetSets, mockCreateSet, mockRefreshedGetSets];

      const component = mountWithTheme(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Sets exerciseID={exerciseID} metrics={metrics} />
        </MockedProvider>
      );

      await updateWrapper(component);
      expect(component.find(Table).prop('rowData')).toHaveLength(0);

      await addNewSet(component, newSetTime, newSetDistance);
      await updateWrapper(component);

      expect(component.find(Table).prop('rowData')).toHaveLength(1);
      expect(component.find(Table).prop('rowData')[0]).toEqual(newSet);
      expect(component.text()).not.toContain(ADD_SET_LOADING_MESSAGE);
      expect(component.text()).not.toContain(errorMessages.sets.createError);
    });
  });

  describe('when the mutation is unsuccessful', () => {
    it('calls create set mutation and displays error', async () => {
      const newSetTime = 33;
      const newSetDistance = 5.6;
      const mockGetSets = {
        request: {
          query: GET_SETS,
          variables: { exerciseID },
        },
        result: {
          data: { sets: [] },
        },
      };

      const mockCreateSet = {
        request: {
          query: CREATE_SET,
          variables: {
            data: {
              exercise: exerciseID,
              time: newSetTime,
              distance: newSetDistance,
              reps: null,
              weight: null,
            },
          },
        },
        result: { errors: [{ message: 'Could not create set' }] },
      };

      const mocks = [mockGetSets, mockCreateSet, mockGetSets];

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
          <Sets exerciseID={exerciseID} metrics={metrics} />
        </MockedProvider>
      );

      await updateWrapper(component);

      expect(component.find(Table).prop('rowData')).toHaveLength(0);

      await addNewSet(component, newSetTime, newSetDistance);

      expect(component.text()).toContain(errorMessages.sets.createError);
      expect(component.text()).not.toContain(ADD_SET_LOADING_MESSAGE);
      expect(component.find(Table).prop('rowData')).toHaveLength(0);
    });
  });
});

describe('deleting a set', () => {
  describe('when the mutation is successful', () => {
    it('removes the set from the row data', async () => {
      const originalSet = {
        id: '1',
        time: 28,
        distance: 5,
        weight: null,
        reps: null,
      };

      const mockGetSets = {
        request: {
          query: GET_SETS,
          variables: { exerciseID },
        },
        result: {
          data: { sets: [originalSet] },
        },
      };

      const mockDeleteSet = {
        request: {
          query: DELETE_SET,
          variables: { id: '1' },
        },
        result: { data: originalSet },
      };

      const mockRefreshGetSets = {
        request: {
          query: GET_SETS,
          variables: { exerciseID },
        },
        result: {
          data: { sets: [] },
        },
      };

      const mocks = [mockGetSets, mockDeleteSet, mockRefreshGetSets];

      const component = mountWithTheme(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Sets exerciseID={exerciseID} metrics={metrics} />
        </MockedProvider>
      );

      await updateWrapper(component);
      expect(component.find(Table)).toHaveLength(1);
      expect(component.find(Table).prop('rowData')).toEqual([originalSet]);

      act(() => {
        component.find(Table).prop('handleDelete')('1');
      });

      expect(component.text()).toContain(DELETE_SET_LOADING_MESSAGE);

      await updateWrapper(component);
      //  ??
      await updateWrapper(component);

      expect(component.find(Table).prop('rowData')).toEqual([]);
      expect(component.text()).not.toContain(DELETE_SET_LOADING_MESSAGE);
      expect(component.text()).not.toContain(errorMessages.sets.deleteError);
    });
  });

  describe('when the mutation is unsuccessful', () => {
    it('renders an error and does not remove any sets', async () => {
      const originalSet = {
        id: '1',
        time: 28,
        distance: 5,
        reps: null,
        weight: null,
      };

      const mockGetSets = {
        request: {
          query: GET_SETS,
          variables: { exerciseID },
        },
        result: {
          data: { sets: [originalSet] },
        },
      };

      const mockDeleteSet = {
        request: {
          query: DELETE_SET,
          variables: { id: '1' },
        },

        result: { errors: [{ message: 'Could not delete set' }] },
      };

      const mocks = [mockGetSets, mockDeleteSet, mockGetSets];

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
          <Sets exerciseID={exerciseID} metrics={metrics} />
        </MockedProvider>
      );

      await updateWrapper(component);
      expect(component.find(Table)).toHaveLength(1);
      expect(component.find(Table).prop('rowData')).toEqual([originalSet]);

      act(() => {
        component.find(Table).prop('handleDelete')('1');
      });

      await updateWrapper(component);

      expect(component.find(Table)).toHaveLength(1);
      expect(component.find(Table).prop('rowData')).toEqual([originalSet]);
      expect(component.text()).not.toContain(DELETE_SET_LOADING_MESSAGE);
      expect(component.text()).toContain(errorMessages.sets.deleteError);
    });
  });
});

describe('editing a set', () => {
  describe('validating editted set input', () => {
    let component;
    const setsData = [
      { id: '1', time: 28, distance: 5, reps: null, weight: null },
    ];

    beforeEach(async () => {
      const mock = {
        request: {
          query: GET_SETS,
          variables: { exerciseID },
        },
        result: {
          data: { sets: setsData },
        },
      };

      component = mountWithTheme(
        <MockedProvider mocks={[mock]} addTypename={false}>
          <Sets exerciseID={exerciseID} metrics={metrics} />
        </MockedProvider>
      );

      await updateWrapper(component);
    });

    it('does not render a validation error message by default', () => {
      expect(component.find(ValidationErrorWrapper).prop('hasError')).toEqual(
        false
      );
    });

    it('renders an error when the new value contains non number characters', async () => {
      component.find(Table).prop('validateCellOnChange')('12a');
      await updateWrapper(component);

      expect(component.find(ValidationErrorWrapper).prop('hasError')).toEqual(
        true
      );
      expect(component.find(ValidationErrorWrapper).text()).toContain(
        errorMessages.sets.failedValidationError
      );
    });

    it('does not render an error when the value is a number as a string', async () => {
      component.find(Table).prop('validateCellOnChange')('12');
      await updateWrapper(component);

      expect(component.find(ValidationErrorWrapper).prop('hasError')).toEqual(
        false
      );
    });

    it('does not render an error when the value is a number', async () => {
      component.find(Table).prop('validateCellOnChange')(12);
      await updateWrapper(component);

      expect(component.find(ValidationErrorWrapper).prop('hasError')).toEqual(
        false
      );
    });
  });

  describe('when the mutation is successful', () => {
    it('updates the edited set', async () => {
      const originalSet = {
        id: '1',
        time: 28,
        distance: 5,
        weight: null,
        reps: null,
      };
      const updatedDetails = {
        time: 30.5,
        distance: 5,
      };
      const updatedSet = { ...originalSet, ...updatedDetails };

      const mockGetSets = {
        request: {
          query: GET_SETS,
          variables: { exerciseID },
        },
        result: {
          data: { sets: [originalSet] },
        },
      };

      const mockEditSet = {
        request: {
          query: UPDATE_SET,
          variables: {
            id: originalSet.id,
            data: updatedDetails,
          },
        },
        result: { data: updatedSet },
      };

      const mockRefreshGetSets = {
        request: {
          query: GET_SETS,
          variables: { exerciseID },
        },
        result: {
          data: { sets: [updatedSet] },
        },
      };

      const mocks = [mockGetSets, mockEditSet, mockRefreshGetSets];

      const component = mountWithTheme(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Sets exerciseID={exerciseID} metrics={metrics} />
        </MockedProvider>
      );

      await updateWrapper(component);
      expect(component.find(Table)).toHaveLength(1);
      expect(component.find(Table).prop('rowData')).toEqual([originalSet]);

      act(() => {
        const row = {
          distance: 5,
          id: '1',
          reps: null,
          time: 30.5,
          weight: null,
          __typename: 'Set',
        };
        component.find(Table).prop('handleEdit')(row);
      });

      expect(component.text()).toContain(UPDATE_SET_LOADING_MESSAGE);

      await updateWrapper(component);
      // ??
      await updateWrapper(component);

      expect(component.find(Table)).toHaveLength(1);
      expect(component.find(Table).prop('rowData')).toEqual([updatedSet]);
      expect(component.text()).not.toContain(UPDATE_SET_LOADING_MESSAGE);
      expect(component.text()).not.toContain(errorMessages.sets.updateError);
    });
  });

  describe('when the mutation is unsuccessful', () => {
    it('renders an error and does not remove any sets', async () => {
      const originalSet = {
        id: '1',
        time: 28,
        distance: 5,
        weight: null,
        reps: null,
      };
      const updatedDetails = {
        time: 30.5,
        distance: 5,
      };

      const mockGetSets = {
        request: {
          query: GET_SETS,
          variables: { exerciseID },
        },
        result: {
          data: { sets: [originalSet] },
        },
      };

      const mockEditSet = {
        request: {
          query: UPDATE_SET,
          variables: { id: originalSet.id, data: updatedDetails },
        },
        result: { errors: [{ message: 'Could not edit set' }] },
      };

      const mocks = [mockGetSets, mockEditSet, mockGetSets];

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
          <Sets exerciseID={exerciseID} metrics={metrics} />
        </MockedProvider>
      );

      await updateWrapper(component);
      expect(component.find(Table)).toHaveLength(1);
      expect(component.find(Table).prop('rowData')).toEqual([originalSet]);

      act(() => {
        const row = {
          distance: 5,
          id: '1',
          reps: null,
          time: 30.5,
          weight: null,
          __typename: 'Set',
        };
        component.find(Table).prop('handleEdit')(row);
      });

      expect(component.text()).toContain(UPDATE_SET_LOADING_MESSAGE);

      await updateWrapper(component);

      expect(component.text()).toContain(errorMessages.sets.updateError);

      expect(component.find(Table)).toHaveLength(1);
      expect(component.find(Table).prop('rowData')).toEqual([originalSet]);
      expect(component.text()).not.toContain(UPDATE_SET_LOADING_MESSAGE);
    });
  });
});
