import { useState } from 'react';
import moment from 'moment';
import fetch from 'node-fetch';
import ApolloClient, { gql } from 'apollo-boost';
import { Layout, List, Button } from '../components';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  fetch: fetch
});

const GET_SESSIONS = gql`
  {
    sessions(userID: "1") {
      date
      id
    }
  }
`;

const ADD_SESSION = gql`
  mutation createSession($data: CreateSessionInput) {
    createSession(data: $data) {
      id
      date
    }
  }
`;

function Sessions({ sessions }) {
  const [startDate, setStartDate] = useState(moment().format('L'));

  const addSession = date => {
    client.mutate({
      mutation: ADD_SESSION,
      variables: { data: { user: '1', date: '2019-12-25' } }
    });
  };

  const formatDate = date => {
    const m = moment(date, 'YYYY-MM-DD')
    console.log(m)
    return m.format('dddd Do MMMM')
  }

  

  return (
    <Layout title={'Sessions'}>
      <List items={sessions} applyFunc={items => formatDate(items.date)} />
      <input value={startDate} onChange={e => setStartDate(e.target.value)} />
      <div className="button-align">
        <Button onClick={() => addSession(startDate)}>Add session +</Button>
      </div>
      <style jsx>{`
        .button-align {
          width: 100%;
          text-align: center;
        }
      `}</style>
    </Layout>
  );
}

Sessions.getInitialProps = async () => {
  const data = await client.query({
    query: GET_SESSIONS
  });

  return { sessions: data.data.sessions };
};

export default Sessions;
