import React from 'react';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/react-testing';
import { mountWithTheme } from '../../util/testing/theme';
import { updateWrapper, actWait } from '../../util/testing/act';
import Sessions, {
  GET_SESSIONS,
  CREATE_SESSION,
  LOADING_MESSAGE,
  ERROR_MESSAGE,
  ADD_SESSION_LOADING_MESSAGE,
  ADD_SESSION_ERROR_MESSAGE,
  DELETE_SESSION_LOADING_MESSAGE,
  DELETE_SESSION_ERROR_MESSAGE,
} from '.';
import { SessionsList, Button } from '../index';

it('renders without error', async () => {
  const mocks = [
    {
      request: {
        query: GET_SESSIONS,
      },
      result: {
        data: {
          sessions: [],
        },
      },
    },
  ];

  await act(async () => {
    mountWithTheme(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Sessions />
      </MockedProvider>
    );
  });
});

it('renders loading state initially', async () => {
  await act(async () => {
    const component = mountWithTheme(
      <MockedProvider mocks={[]}>
        <Sessions />
      </MockedProvider>
    );

    expect(component.text()).toContain(LOADING_MESSAGE);
    expect(component.text()).not.toContain(ERROR_MESSAGE);
    expect(component.find(SessionsList).length).toEqual(0);
  });
});

it('renders SessionList when the get Sessions query is successful', async () => {
  const sessionsData = [
    { id: '1', date: '2019-02-03' },
    { id: '2', date: '2019-02-10' },
  ];

  const mock = {
    request: {
      query: GET_SESSIONS,
    },
    result: {
      data: { sessions: sessionsData },
    },
  };

  const component = mountWithTheme(
    <MockedProvider mocks={[mock]} addTypename={false}>
      <Sessions />
    </MockedProvider>
  );

  await updateWrapper(component);

  expect(component.text()).not.toContain(LOADING_MESSAGE);
  expect(component.text()).not.toContain(ERROR_MESSAGE);
  const sessionList = component.find(SessionsList);
  expect(sessionList.length).toEqual(1);
  expect(sessionList.prop('sessions')).toEqual(sessionsData);
});

it('displays an error message when the query is unsuccessful', async () => {
  const mock = {
    request: {
      query: GET_SESSIONS,
    },
    error: new Error('Could not fetch sessions'),
  };

  const component = mountWithTheme(
    <MockedProvider mocks={[mock]} addTypename={false}>
      <Sessions />
    </MockedProvider>
  );

  await updateWrapper(component);

  expect(component.text()).not.toContain(LOADING_MESSAGE);
  expect(component.text()).toContain(ERROR_MESSAGE);
  expect(component.find(SessionsList).length).toEqual(0);
});

describe('adding a session', () => {
  describe('when the mutation is successful', () => {
    it('calls create session mutation and displays refetched sessions', async () => {
      Date.now = jest.fn(() => new Date(Date.UTC(2020, 1, 1)).valueOf());

      const mockGetSessions = {
        request: {
          query: GET_SESSIONS,
        },
        result: {
          data: { sessions: [] },
        },
      };

      const mockCreateSession = {
        request: {
          query: CREATE_SESSION,
          variables: { data: { date: '2020-02-01' } },
        },
        result: { data: { id: '3', date: '2020-02-01' } },
      };

      const mockRefreshedGetSessions = {
        request: {
          query: GET_SESSIONS,
        },
        result: {
          data: { sessions: [{ id: '3', date: '2020-02-01' }] },
        },
      };

      const mocks = [
        mockGetSessions,
        mockCreateSession,
        mockRefreshedGetSessions,
      ];

      const component = mountWithTheme(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Sessions />
        </MockedProvider>
      );

      await updateWrapper(component);

      act(() => {
        component
          .find('#input-new-session-date')
          .simulate('change', { target: { value: '2020-02-01' } });
      });
      await updateWrapper(component);

      act(() => {
        component.find('button').find('#add-new-session').prop('onClick')();
      });

      expect(component.text()).toContain(ADD_SESSION_LOADING_MESSAGE);

      await actWait();

      expect(component.text()).not.toContain(ADD_SESSION_LOADING_MESSAGE);
      expect(component.find(ADD_SESSION_ERROR_MESSAGE).exists()).toBe(false);
      expect(component.text()).toContain('Saturday 1st February');
    });
  });

  describe('when the mutation is unsuccessful', () => {
    it('calls create session mutation and displays error', async () => {
      Date.now = jest.fn(() => new Date(Date.UTC(2020, 1, 1)).valueOf());

      const mockGetSessions = {
        request: {
          query: GET_SESSIONS,
        },
        result: {
          data: { sessions: [] },
        },
      };
      const mockError = {
        request: {
          query: CREATE_SESSION,
          variables: { data: { date: '2020-02-01' } },
        },
        result: { errors: [{ message: 'Could not fetch sessions' }] },
      };

      const mocks = [mockGetSessions, mockError, mockGetSessions];

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
          <Sessions />
        </MockedProvider>
      );

      await updateWrapper(component);

      act(() => {
        component
          .find('#input-new-session-date')
          .simulate('change', { target: { value: '2020-02-01' } });
      });
      await updateWrapper(component);
      act(() => {
        component.find('button').find('#add-new-session').prop('onClick')();
      });

      await actWait();

      expect(component.text()).toContain(ADD_SESSION_ERROR_MESSAGE);
    });
  });
});
