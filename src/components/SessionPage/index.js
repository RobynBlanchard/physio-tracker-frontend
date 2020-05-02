import { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import { SessionsList, Button, InformationText, ErrorText } from '../index';

export const LOADING_MESSAGE = 'loading sessions';
export const ERROR_MESSAGE = 'error fetching sessions';

export const ADD_SESSION_LOADING_MESSAGE = 'adding session';
export const ADD_SESSION_ERROR_MESSAGE = 'sorry could not add session';

export const DELETE_SESSION_LOADING_MESSAGE = 'deleting session';
export const DELETE_SESSION_ERROR_MESSAGE = 'sorry could not delete session';

export const UPDATE_SESSION_LOADING_MESSAGE = 'updating session';
export const UPDATE_SESSION_ERROR_MESSAGE = 'sorry could not update session';

export const INVALID_DATE_SUBMITTED = 'please enter a valid date';

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

export const DELETE_SESSION = gql`
  mutation deleteSession($id: ID!) {
    deleteSession(id: $id) {
      id
      date
    }
  }
`;

export const UPDATE_SESSION = gql`
  mutation updateSession($id: ID!, $data: updateSessionInput!) {
    updateSession(id: $id, data: $data) {
      id
      date
    }
  }
`;

function Sessions() {
  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
  const [addSession, addSessionResponse] = useMutation(CREATE_SESSION);
  const [deleteSession, deleteSessionResponse] = useMutation(DELETE_SESSION);
  const [updateSession, updateSessionResponse] = useMutation(UPDATE_SESSION);

  const { loading, error, data } = useQuery(GET_SESSIONS);
  const [dateError, displayDateError] = useState(false);

  const handleAddSession = (date) => {
    const isValidDate = moment(date).isValid();

    if (!isValidDate) {
      return displayDateError(true);
    }
    return addSession({
      variables: { data: { date } },
      refetchQueries: [
        {
          query: GET_SESSIONS,
        },
      ],
    });
  };

  const handleDeleteSession = (id) =>
    deleteSession({
      variables: { id },
      refetchQueries: [
        {
          query: GET_SESSIONS,
        },
      ],
    });

  const handleEditSession = (id, newDate) =>
    updateSession({
      variables: { id, data: { date: newDate } },
      refetchQueries: [
        {
          query: GET_SESSIONS,
        },
      ],
    });

  if (loading) return <InformationText>{LOADING_MESSAGE}</InformationText>;
  if (error) return <ErrorText>{ERROR_MESSAGE}</ErrorText>;

  return (
    <div>
      <SessionsList
        sessions={data && data.sessions}
        deleteSession={handleDeleteSession}
        submitEditSession={handleEditSession}
      />
      {addSessionResponse.error && (
        <ErrorText>{ADD_SESSION_ERROR_MESSAGE}</ErrorText>
      )}
      {addSessionResponse.loading && (
        <InformationText>{ADD_SESSION_LOADING_MESSAGE}</InformationText>
      )}
      {deleteSessionResponse.error && (
        <ErrorText>{DELETE_SESSION_ERROR_MESSAGE}</ErrorText>
      )}
      {deleteSessionResponse.loading && (
        <InformationText>{DELETE_SESSION_LOADING_MESSAGE}</InformationText>
      )}
      {updateSessionResponse.error && (
        <ErrorText>{UPDATE_SESSION_ERROR_MESSAGE}</ErrorText>
      )}
      {updateSessionResponse.loading && (
        <InformationText>{UPDATE_SESSION_LOADING_MESSAGE}</InformationText>
      )}
      {dateError && <ErrorText>{INVALID_DATE_SUBMITTED}</ErrorText>}

      <div className="input-align">
        <input
          id="input-new-session-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          onClick={() => displayDateError(false)}
          maxLength="10"
        />
      </div>
      <div className="button-align">
        <Button
          id="add-new-session"
          onClick={() => handleAddSession(startDate)}
        >
          Add session +
        </Button>
      </div>
      <style jsx>
        {`
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
        `}
      </style>
    </div>
  );
}

export default Sessions;
