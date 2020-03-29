import { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import { SessionsList, Button, InformationText, ErrorText } from '../index';

export const LOADING_MESSAGE = 'loading sessions';
export const ERROR_MESSAGE = 'error fetching sessions';

export const GET_SESSIONS = gql`
  query getSessions {
    sessions {
      id
      date
    }
  }
`;

export const CREATE_SESSION = gql`
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
      variables: { data: { date } },
      refetchQueries: [
        {
          query: GET_SESSIONS
        }
      ]
    });
  };

  if (loading) return <InformationText>{LOADING_MESSAGE}</InformationText>;
  if (error) return <ErrorText>{ERROR_MESSAGE}</ErrorText>;

  return (
    <div>
      <SessionsList sessions={data && data.sessions} />
      {addSessionResponse.error && (
        <ErrorText>{addSessionResponse.error.message}</ErrorText>
      )}
      {addSessionResponse.loading && (
        <InformationText>Adding session</InformationText>
      )}
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
    </div>
  );
}

export default Sessions;
