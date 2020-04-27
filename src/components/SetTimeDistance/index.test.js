import React from 'react';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/react-testing';
import { mountWithTheme } from '../../util/testing/theme';
import { updateWrapper } from '../../util/testing/act';
import Sets, {
  GET_SETS,
  CREATE_SET,
  DELETE_SET,
  UPDATE_SET,
  LOADING_MESSAGE,
  ERROR_MESSAGE,
  ADD_SET_LOADING_MESSAGE,
  ADD_SET_ERROR_MESSAGE,
  DELETE_SET_LOADING_MESSAGE,
  DELETE_SET_ERROR_MESSAGE,
  UPDATE_SET_LOADING_MESSAGE,
  UPDATE_SET_ERROR_MESSAGE,
} from '.';
import Table from '../Table';

const exerciseID = '1';

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
        <Sets exerciseID={exerciseID} />
      </MockedProvider>
    );
  });
});

it('renders loading state initially', async () => {
  let component;
  await act(async () => {
    component = mountWithTheme(
      <MockedProvider mocks={[]}>
        <Sets exerciseID={exerciseID} />
      </MockedProvider>
    );
  });

  expect(component.find(Table)).toHaveLength(0);
  expect(component.text()).toContain(LOADING_MESSAGE);
  expect(component.text()).not.toContain(ERROR_MESSAGE);
});

describe('fetching sets', () => {
  it('renders a Sets Table when the get Sets query is successful', async () => {
    const setsData = [
      { id: '1', time: 28, distance: 5 },
      { id: '2', time: 33, distance: 5.6 },
    ];

    const mock = {
      request: {
        query: GET_SETS,
        variables: { exerciseID },
      },
      result: {
        data: { sets: setsData },
      },
    };

    const component = mountWithTheme(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <Sets exerciseID={exerciseID} />
      </MockedProvider>
    );

    await updateWrapper(component);

    expect(component.text()).not.toContain(LOADING_MESSAGE);
    expect(component.text()).not.toContain(ERROR_MESSAGE);
    const setsTable = component.find(Table);
    expect(setsTable).toHaveLength(1);
    expect(setsTable.prop('rowData')).toEqual(setsData);
  });

  it('displays an error message when the query is unsuccessful', async () => {
    const mock = {
      request: {
        query: GET_SETS,
        variables: { exerciseID },
      },
      error: new Error('Could not fetch sets'),
    };

    const component = mountWithTheme(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <Sets exerciseID={exerciseID} />
      </MockedProvider>
    );

    await updateWrapper(component);

    expect(component.text()).not.toContain(LOADING_MESSAGE);
    expect(component.text()).toContain(ERROR_MESSAGE);
    expect(component.find(Table)).toHaveLength(0);
  });
});

describe('adding a set', () => {
  const addNewSet = async (component, newSetTime, newSetDistance) => {
    act(() => {
      component.find('#input-new-time').prop('onChange')({
        target: { value: newSetTime },
      });
    });

    await updateWrapper(component);

    act(() => {
      component.find('#input-new-distance').prop('onChange')({
        target: { value: newSetDistance },
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
          <Sets exerciseID={exerciseID} />
        </MockedProvider>
      );

      await updateWrapper(component);
      expect(component.find(Table).prop('rowData')).toHaveLength(0);

      await addNewSet(component, newSetTime, newSetDistance);

      expect(component.find(Table).prop('rowData')).toHaveLength(1);
      expect(component.find(Table).prop('rowData')[0]).toEqual(newSet);
      expect(component.text()).not.toContain(ADD_SET_LOADING_MESSAGE);
      expect(component.text()).not.toContain(ADD_SET_ERROR_MESSAGE);
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
          <Sets exerciseID={exerciseID} />
        </MockedProvider>
      );

      await updateWrapper(component);

      expect(component.find(Table).prop('rowData')).toHaveLength(0);

      await addNewSet(component, newSetTime, newSetDistance);

      expect(component.text()).toContain(ADD_SET_ERROR_MESSAGE);
      expect(component.text()).not.toContain(ADD_SET_LOADING_MESSAGE);
      expect(component.find(Table).prop('rowData')).toHaveLength(0);
    });
  });
});

describe('deleting a set', () => {
  describe('when the mutation is successful', () => {
    it('removes the set from the row data', async () => {
      const originalSet = { id: '1', time: 28, distance: 5 };

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
          <Sets exerciseID={exerciseID} />
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

      expect(component.find(Table).prop('rowData')).toEqual([]);
      expect(component.text()).not.toContain(DELETE_SET_LOADING_MESSAGE);
      expect(component.text()).not.toContain(DELETE_SET_ERROR_MESSAGE);
    });
  });

  describe('when the mutation is unsuccessful', () => {
    it('renders an error and does not remove any sets', async () => {
      const originalSet = { id: '1', time: 28, distance: 5 };

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
          <Sets exerciseID={exerciseID} />
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
      expect(component.text()).toContain(DELETE_SET_ERROR_MESSAGE);
    });
  });
});

describe('editing a set', () => {
  describe('when the mutation is successful', () => {
    it('updates the edited set', async () => {
      const originalSet = { id: '1', time: 28, distance: 5 };
      const updatedDetails = { time: 30.5, distance: 5 };
      const updatedSet = { id: '1', ...updatedDetails };

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
          <Sets exerciseID={exerciseID} />
        </MockedProvider>
      );

      await updateWrapper(component);
      expect(component.find(Table)).toHaveLength(1);
      expect(component.find(Table).prop('rowData')).toEqual([originalSet]);

      act(() => {
        component.find(Table).prop('handleEdit')('1', 30.5, 5);
      });

      expect(component.text()).toContain(UPDATE_SET_LOADING_MESSAGE);

      await updateWrapper(component);

      expect(component.find(Table)).toHaveLength(1);
      expect(component.find(Table).prop('rowData')).toEqual([updatedSet]);
      expect(component.text()).not.toContain(UPDATE_SET_LOADING_MESSAGE);
      expect(component.text()).not.toContain(UPDATE_SET_ERROR_MESSAGE);
    });
  });

  describe('when the mutation is unsuccessful', () => {
    it('renders an error and does not remove any sets', async () => {
      const originalSet = { id: '1', time: 28, distance: 5 };
      const updatedDetails = { time: 30.5, distance: 5 };

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
          <Sets exerciseID={exerciseID} />
        </MockedProvider>
      );

      await updateWrapper(component);
      expect(component.find(Table)).toHaveLength(1);
      expect(component.find(Table).prop('rowData')).toEqual([originalSet]);

      act(() => {
        component.find(Table).prop('handleEdit')('1', 30.5, 5);
      });

      expect(component.text()).toContain(UPDATE_SET_LOADING_MESSAGE);

      await updateWrapper(component);

      expect(component.text()).toContain(UPDATE_SET_ERROR_MESSAGE);

      expect(component.find(Table)).toHaveLength(1);
      expect(component.find(Table).prop('rowData')).toEqual([originalSet]);
      expect(component.text()).not.toContain(UPDATE_SET_LOADING_MESSAGE);
    });
  });
});
