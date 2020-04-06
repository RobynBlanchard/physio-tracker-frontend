import React from 'react';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/react-testing';
import { mountWithTheme } from '../../util/testing/theme';
import { updateWrapper } from '../../util/testing/act';
import Sessions, {
  GET_SESSIONS,
  CREATE_SESSION,
  LOADING_MESSAGE,
  ERROR_MESSAGE,
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

// adding a session
describe('adding a session', () => {
  it.only('calls create session mutation and displays refetched sessions', async () => {
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
        variables: { data: { date: '2019-02-30' } },
      },
      result: { data: { id: '3', date: '2019-02-30' } },
    };

    const mockRefreshedGetSessions = {
      request: {
        query: GET_SESSIONS,
      },
      result: {
        data: { sessions: [{ id: '3', date: '2019-02-30' }] },
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
    console.log('1', component.debug());

    component
      .find('#input-new-session-date')
      .simulate('change', { target: { value: '2019-02-30' } });
      console.log('2', component.debug());

    await act(async () => {
    console.log('3', component.debug());

      await component.find('button').find('#add-new-session').prop('onClick')();
    console.log('4',component.debug());

    });
    // console.log(component.debug());
    console.log(component.debug());

    // expect(component.text()).toContain('Adding session');
    await updateWrapper(component);

    // console.log(component.debug());
    // expect(component.text()).toContain('Adding session');

    expect(component.text()).not.toContain(ERROR_MESSAGE);
    const sessionList = component.find(SessionsList);
    expect(sessionList.length).toEqual(1);
    // expect(sessionList.prop('sessions')).toEqual(sessionsData);
  });
});
