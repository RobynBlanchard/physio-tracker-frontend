import React from 'react';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/react-testing';
import { mountWithTheme } from '../../util/testing/theme';
import { updateWrapper, actWait } from '../../util/testing/act';
import Sessions, {
  GET_SESSIONS,
  CREATE_SESSION,
  DELETE_SESSION,
  UPDATE_SESSION,
  LOADING_MESSAGE,
  ERROR_MESSAGE,
  ADD_SESSION_LOADING_MESSAGE,
  ADD_SESSION_ERROR_MESSAGE,
  DELETE_SESSION_LOADING_MESSAGE,
  DELETE_SESSION_ERROR_MESSAGE,
  UPDATE_SESSION_LOADING_MESSAGE,
  UPDATE_SESSION_ERROR_MESSAGE,
} from '.';
import { SessionsList } from '../index';

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

describe('fetching sessions', () => {
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
});

describe('adding a session', () => {
  describe('when the mutation is successful', () => {
    it('calls create session mutation and displays refetched sessions', async () => {
      Date.now = jest.fn(() => new Date(Date.UTC(2020, 1, 1)).valueOf());

      const newSession = { id: '3', date: '2020-02-01' };

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
        result: { data: newSession },
      };

      const mockRefreshedGetSessions = {
        request: {
          query: GET_SESSIONS,
        },
        result: {
          data: { sessions: [newSession] },
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

      expect(component.find(SessionsList).prop('sessions').length).toEqual(0);

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

      await updateWrapper(component);

      expect(component.find(SessionsList).prop('sessions').length).toEqual(1);
      expect(component.find(SessionsList).prop('sessions')[0]).toEqual(
        newSession
      );

      expect(component.text()).not.toContain(ADD_SESSION_LOADING_MESSAGE);
      expect(component.text()).not.toContain(ADD_SESSION_ERROR_MESSAGE);
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

      expect(component.find(SessionsList).prop('sessions').length).toEqual(0);

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

      expect(component.text()).not.toContain(ADD_SESSION_LOADING_MESSAGE);
      expect(component.find(SessionsList).prop('sessions').length).toEqual(0);
    });
  });
});

describe('deleting a session', () => {
  describe('when the mutation is successful', () => {
    it('removes the session from the list', async () => {
      const mockGetSessions = {
        request: {
          query: GET_SESSIONS,
        },
        result: {
          data: { sessions: [{ id: '1', date: '2020-02-01' }] },
        },
      };

      const mockDeleteSession = {
        request: {
          query: DELETE_SESSION,
          variables: { id: '1' },
        },
        result: { data: { id: '1', date: '2020-02-01' } },
      };

      const mockRefreshGetSessions = {
        request: {
          query: GET_SESSIONS,
        },
        result: {
          data: { sessions: [] },
        },
      };

      const mocks = [
        mockGetSessions,
        mockDeleteSession,
        mockRefreshGetSessions,
      ];

      const component = mountWithTheme(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Sessions />
        </MockedProvider>
      );

      await updateWrapper(component);
      expect(component.find(SessionsList).prop('sessions').length).toEqual(1);

      act(() => {
        component.find(SessionsList).prop('deleteSession')('1');
      });

      expect(component.text()).toContain(DELETE_SESSION_LOADING_MESSAGE);

      await updateWrapper(component);

      expect(component.find(SessionsList).prop('sessions').length).toEqual(0);
      expect(component.text()).not.toContain(DELETE_SESSION_LOADING_MESSAGE);
      expect(component.text()).not.toContain(DELETE_SESSION_ERROR_MESSAGE);
    });
  });

  describe('when the mutation is unsuccessful', () => {
    it('renders an error and does not remove any sessions', async () => {
      const mockGetSessions = {
        request: {
          query: GET_SESSIONS,
        },
        result: {
          data: { sessions: [{ id: '1', date: '2020-02-01' }] },
        },
      };

      const mockDeleteSession = {
        request: {
          query: DELETE_SESSION,
          variables: { id: '1' },
        },
        result: { errors: [{ message: 'Could not delete session' }] },
      };

      const mocks = [mockGetSessions, mockDeleteSession, mockGetSessions];

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
      expect(component.find(SessionsList).prop('sessions').length).toEqual(1);

      act(() => {
        component.find(SessionsList).prop('deleteSession')('1');
      });

      await updateWrapper(component);

      expect(component.find(SessionsList).prop('sessions').length).toEqual(1);
      expect(component.text()).not.toContain(DELETE_SESSION_LOADING_MESSAGE);
      expect(component.text()).toContain(DELETE_SESSION_ERROR_MESSAGE);
    });
  });
});

describe('editing a session', () => {
  describe('when the mutation is successful', () => {
    it('updates the edited session', async () => {
      const originalSession = { id: '1', date: '2020-02-01' };
      const updatedSession = { id: '1', date: '2020-02-03' };

      const mockGetSessions = {
        request: {
          query: GET_SESSIONS,
        },
        result: {
          data: { sessions: [originalSession] },
        },
      };

      const mockEditSession = {
        request: {
          query: UPDATE_SESSION,
          variables: { id: '1', data: { date: '2020-02-03' } },
        },
        result: { data: updatedSession },
      };

      const mockRefreshGetSessions = {
        request: {
          query: GET_SESSIONS,
        },
        result: {
          data: { sessions: [updatedSession] },
        },
      };

      const mocks = [mockGetSessions, mockEditSession, mockRefreshGetSessions];

      const component = mountWithTheme(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Sessions />
        </MockedProvider>
      );

      await updateWrapper(component);
      expect(component.find(SessionsList).prop('sessions').length).toEqual(1);
      expect(component.find(SessionsList).prop('sessions')[0]).toEqual(
        originalSession
      );

      act(() => {
        component.find(SessionsList).prop('submitEditSession')(
          '1',
          '2020-02-03'
        );
      });

      expect(component.text()).toContain(UPDATE_SESSION_LOADING_MESSAGE);

      await updateWrapper(component);

      expect(component.find(SessionsList).prop('sessions').length).toEqual(1);
      expect(component.find(SessionsList).prop('sessions')[0]).toEqual(
        updatedSession
      );

      expect(component.text()).not.toContain(UPDATE_SESSION_LOADING_MESSAGE);
      expect(component.text()).not.toContain(UPDATE_SESSION_ERROR_MESSAGE);
    });
  });

  describe('when the mutation is unsuccessful', () => {
    it('renders an error and does not remove any sessions', async () => {
      const originalSession = { id: '1', date: '2020-02-01' };
      const mockGetSessions = {
        request: {
          query: GET_SESSIONS,
        },
        result: {
          data: { sessions: [originalSession] },
        },
      };

      const mockEditSession = {
        request: {
          query: UPDATE_SESSION,
          variables: { id: '1', data: { date: '2020-02-03' } },
        },
        result: { errors: [{ message: 'Could not edit session' }] },
      };

      const mocks = [mockGetSessions, mockEditSession, mockGetSessions];

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
      expect(component.find(SessionsList).prop('sessions').length).toEqual(1);
      expect(component.find(SessionsList).prop('sessions')[0]).toEqual(
        originalSession
      );

      act(() => {
        component.find(SessionsList).prop('submitEditSession')(
          '1',
          '2020-02-03'
        );
      });

      await updateWrapper(component);

      expect(component.text()).toContain(UPDATE_SESSION_ERROR_MESSAGE);

      expect(component.find(SessionsList).prop('sessions').length).toEqual(1);
      expect(component.find(SessionsList).prop('sessions')[0]).toEqual(
        originalSession
      );
      expect(component.text()).not.toContain(UPDATE_SESSION_LOADING_MESSAGE);
    });
  });
});
