import Link from 'next/link';
import { useState, useRef } from 'react';
import moment from 'moment';
import { arrayOf, shape, string, func } from 'prop-types';
import { ListItem, Anchor, List, Text } from './style';
import { SaveButton, EditButton, DeleteButton } from '../CRUDButtons';

const SessionsList = ({ deleteSession, submitEditSession, sessions }) => {
  const inputRef = useRef(null);
  const saveRef = useRef(null);
  const [edittedSession, updatedEdittedSession] = useState(null);

  const formatDate = (date) =>
    moment(date, 'YYYY-MM-DD').format('dddd MMMM Do YYYY');

  const handleDeleteSession = (id) => {
    deleteSession(id);
  };

  const handleCancelEdit = (e) => {
    const clickOutsideInput =
      inputRef.current && !inputRef.current.contains(e.target);
    const clickOutsideSaveIcon =
      saveRef.current && !saveRef.current.contains(e.target);

    if (clickOutsideInput && clickOutsideSaveIcon) {
      updatedEdittedSession(null);
      document.removeEventListener('mousedown', handleCancelEdit);
    }
  };

  const handleEditSession = (id, date) => {
    document.addEventListener('mousedown', handleCancelEdit);

    updatedEdittedSession({ id, date });
  };

  const linkToSession = (id, date) => (
    <Link href="/exercises/[id]" as={`/exercises/${id}`}>
      <Anchor>
        <Text>{formatDate(date)}</Text>
      </Anchor>
    </Link>
  );

  const renderEditSession = () => {
    const handleChange = (e) => {
      e.persist();
      updatedEdittedSession((prevSession) => ({
        ...prevSession,
        date: e.target.value,
      }));
    };
    return (
      <input
        ref={inputRef}
        value={edittedSession.date}
        onChange={handleChange}
      />
    );
  };

  const handleSaveSession = (oldDate) => {
    if (oldDate !== edittedSession.date) {
      const { id, date } = edittedSession;
      submitEditSession(id, date);
    }
    updatedEdittedSession(null);
    document.removeEventListener('mousedown', handleCancelEdit);
  };

  const isSessionUnderEdit = (id) =>
    !!edittedSession && edittedSession.id === id;

  return (
    <List>
      {sessions.map((session) => {
        const { id, date } = session;
        const formattedDate = moment(date).format('YYYY-MM-DD');
        return (
          <ListItem key={id}>
            {isSessionUnderEdit(id)
              ? renderEditSession()
              : linkToSession(id, formattedDate)}
            <div>
              {isSessionUnderEdit(id) ? (
                <SaveButton
                  ref={saveRef}
                  onClick={() => handleSaveSession(formattedDate)}
                  title="Save session"
                />
              ) : (
                <EditButton
                  onClick={() => handleEditSession(id, formattedDate)}
                  title="Edit session"
                />
              )}
              <DeleteButton
                onClick={() => handleDeleteSession(id)}
                title="Delete this session?"
              />
            </div>
          </ListItem>
        );
      })}
    </List>
  );
};

SessionsList.defaultProps = {
  sessions: [],
  deleteSession: () => {},
  submitEditSession: () => {},
};

SessionsList.propTypes = {
  sessions: arrayOf(
    shape({
      id: string,
      date: string,
    })
  ),
  deleteSession: func,
  submitEditSession: func,
};

export default SessionsList;
