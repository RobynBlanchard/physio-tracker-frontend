import React from 'react';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/react-testing';
import { mountWithTheme } from '../../util/testing/theme';
import { updateWrapper } from '../../util/testing/act';
import Sessions, { GET_SESSIONS, LOADING_MESSAGE, ERROR_MESSAGE } from '.';
import { SessionsList } from '../index';

it('renders without error', async () => {
  const mocks = [
    {
      request: {
        query: GET_SESSIONS,
        variables: {
          data: { userID: '1' }
        }
      },
      result: {
        data: {
          sessions: []
        }
      }
    }
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
    { id: '2', date: '2019-02-10' }
  ];

  const mock = {
    request: {
      query: GET_SESSIONS,
      variables: {
        userID: '1'
      }
    },
    result: {
      data: { sessions: sessionsData }
    }
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
      variables: {
        userID: '1'
      }
    },
    error: new Error('Could not fetch sessions')
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
