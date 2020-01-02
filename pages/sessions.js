import { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import { Layout, SessionsList, Button } from '../components';

const GET_SESSIONS = gql`
  {
    sessions(userID: "1") {
      date
      id
    }
  },
  
`;

const CREATE_SESSION = gql`
  mutation createSession($data: CreateSessionInput) {
    createSession(data: $data) {
      id
      date
    }
  }
`;

function Sessions() {
  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
  const [addSession, addSessionResponse] = useMutation(CREATE_SESSION);
  const { loading, error, data } = useQuery(GET_SESSIONS);

  const handleAddSession = date => {
    return addSession({
      variables: { data: { user: '1', date } },
      refetchQueries: [
        {
          query: GET_SESSIONS,
          variables: { userID: '1' }
        }
      ]
    });
  };

  console.log('data', data);
  console.log('loading', loading)
  console.log('error', error)



// https://www.nearform.com/blog/introducing-graphql-hooks/


  return (
    <Layout title={'Sessions'}>
      <SessionsList sessions={data && data.sessions} loading={loading} error={error} />
      {addSessionResponse.error && (
        <div>{addSessionResponse.error.message}</div>
      )}

      {addSessionResponse.loading && <div>loading</div>}
      <div className="input-align">
        <input
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          maxLength="10"
        />
      </div>
      <div className="button-align">
        <Button onClick={() => handleAddSession(startDate)}>
          Add session +
        </Button>
      </div>
      <style jsx>{`
        .button-align,
        .input-align {
          text-align: center;
        }

        .input-align {
          padding: 20px;
        }

        input {
          font-family: inherit;
          padding: 4px 12px;
        }

        input:focus {
          outline: 2px solid #1d75c7;
        }
      `}</style>
    </Layout>
  );
}

export default Sessions;
