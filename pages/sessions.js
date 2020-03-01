import { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import { Layout, SessionsList, Button } from '../components';
import { useAuth } from '../context/authentication';
import SessionPage from '../components/SessionPage';
// const GET_SESSIONS = gql`
//   {
//     sessions {
//       date
//       id
//     }
//   }
// `;

// const CREATE_SESSION = gql`
//   mutation createSession($data: CreatSessionInput) {
//     createSession(data: $data) {
//       id
//       date
//     }
//   }
// `;

function Sessions() {
  // const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
  // const [addSession, addSessionResponse] = useMutation(CREATE_SESSION);
  // const { loading, error, data } = useQuery(GET_SESSIONS);
  // const { user } = useAuth();
  // console.log(user)
  // const handleAddSession = date => {
  //   return addSession({
  //     variables: { data: { date } },
  //     refetchQueries: [
  //       {
  //         query: GET_SESSIONS
  //       }
  //     ]
  //   });
  // };

  return (
    <Layout title={'Sessions'}>
      <SessionPage />
      {/* <SessionsList
        sessions={data && data.sessions}
        loading={loading}
        error={error}
      />
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
      </div> */} 
    </Layout>
  );
}

export default Sessions;
