import Link from 'next/link';
import { useState, useRef } from 'react';
import moment from 'moment';
import { arrayOf, shape, string } from 'prop-types';
import { ListItem, Anchor, List, Text, StyledIcon, IconButton } from './style';

const SessionsList = ({ deleteSession, submitEditSession, sessions = [] }) => {
  const inputRef = useRef(null);
  const saveRef = useRef(null);
  const [edittedSession, updatedEdittedSession] = useState(null);

  const formatDate = (date) => {
    const m = moment(date, 'YYYY-MM-DD');
    return m.format('dddd Do MMMM');
  };

  const handleDeleteSession = (id) => {
    deleteSession(id);
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
                <IconButton
                  id="save-button"
                  onClick={() => handleSaveSession(formattedDate)}
                  ref={saveRef}
                >
                  <StyledIcon
                    aria-hidden="true"
                    title="Save session"
                    aria-label="Save"
                    icon="save"
                    size="lg"
                  />
                </IconButton>
                // <SaveIcon ref onClick />
              ) : (
                <IconButton
                  id="edit-button"
                  onClick={() => handleEditSession(id, formattedDate)}
                >
                  <StyledIcon
                    aria-hidden="true"
                    title="Edit session"
                    aria-label="Edit"
                    icon="edit"
                    size="lg"
                  />
                </IconButton>
              )}
              <IconButton
                id="delete-button"
                onClick={() => handleDeleteSession(id)}
              >
                <StyledIcon
                  aria-hidden="true"
                  title="Delete this session?"
                  aria-label="Delete"
                  icon="trash-alt"
                  size="lg"
                />
              </IconButton>
            </div>
          </ListItem>
        );
      })}
    </List>
  );
};

SessionsList.propTypes = {
  sessions: arrayOf(
    shape({
      id: string,
      date: string,
    })
  ),
};

export default SessionsList;
