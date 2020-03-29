import React from 'react';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/react-testing';
import { mountWithTheme } from '../../util/testing/theme';
import { updateWrapper } from '../../util/testing/act';
import Sessions, {
  GET_SESSIONS,
  CREATE_SESSION,
  LOADING_MESSAGE,
  ERROR_MESSAGE
} from '.';
import { SessionsList, Button } from '../index';

it('renders without error', async () => {
  const mocks = [
    {
      request: {
        query: GET_SESSIONS
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
      query: GET_SESSIONS
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
      query: GET_SESSIONS
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

// adding a session
describe('adding a session', () => {
  it('calls create session mutation and displays refetched sessions', async () => {
    const sessionsData = [
      { id: '1', date: '2019-02-03' },
      { id: '2', date: '2019-02-10' }
    ];

    const mock = {
      request: {
        query: GET_SESSIONS
      },
      result: {
        data: { sessions: sessionsData }
      }
    };

    const mutationMock = {
      request: {
        query: CREATE_SESSION,
        variables: {  date: '2019-02-30' }
      },
      result: {
        data: {
          __typename: "Mutation",
          // Mock here the expected result of your query.
          updateitem: {
            __typename: "Session",
            id: '3',
            date: '2019-02-30'
            // ...additional data
          }
        }
      }
    };

    // const mutationMock = {
    //   request: {
    //     query: CREATE_SESSION,
    //     variables: {
    //       date: '2019-02-30'
    //     },
    //     refetchQueries:[{
    //       query: GET_SESSIONS,
    //       //  variables:{
    //       //   id:4
    //       //  }
    //      }],
    //   },
    //   // result: {
    //   //   data: { sessions: sessionsData.concat({id: '3', date: '2019-02-30'}) }
    //   // }
    //   result: {
    //     data: { id: '3', date: '2019-02-30' }
    //   }
    // };

    const getMock2 = {
      request: {
        query: GET_SESSIONS
      },
      result: {
        data: { sessions: sessionsData.concat({ id: '3', date: '2019-02-30' }) }
      }
    }

    const component = mountWithTheme(
      <MockedProvider  mocks={[ mock, mutationMock, getMock2]} addTypename={false}>
        <Sessions />
      </MockedProvider>
    );

    await updateWrapper(component);

    // console.log(component.debug());

    component
      .find('input')
      .simulate('change', { target: { value: '2019-02-30' } });

    await act(async () => {

      // component.find('button').simulate('click');
      await component.find('button').prop('onClick')();

    console.log('1======');

    });
    await updateWrapper(component);

    console.log('2=====');

    console.log(component.debug());

    // expect(component.text()).not.toContain(LOADING_MESSAGE);
    // expect(component.text()).not.toContain(ERROR_MESSAGE);
    const sessionList = component.find(SessionsList);
    expect(sessionList.length).toEqual(3);
    // expect(sessionList.prop('sessions')).toEqual(sessionsData);
  });
});
