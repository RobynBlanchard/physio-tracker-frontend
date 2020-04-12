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

  const handleDeleteSession = (e) => {
    const id = e.target.getAttribute('data-id');
    deleteSession(id);
  };

  const handleEditSession = (e) => {
    document.addEventListener('mousedown', handleCancelEdit);
    const id = e.target.getAttribute('data-id');
    const date = moment(e.target.getAttribute('data-date')).format(
      'YYYY-MM-DD'
    );
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

  const handleSaveSession = (e) => {
    const oldDate = e.target.getAttribute('data-date');
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
        return (
          <ListItem key={id}>
            {isSessionUnderEdit(id)
              ? renderEditSession()
              : linkToSession(id, date)}
            <div>
              {isSessionUnderEdit(id) ? (
                <IconButton
                  onClick={handleSaveSession}
                  ref={saveRef}
                  data-id={id}
                  data-date={date}
                >
                  <StyledIcon
                    aria-hidden="true"
                    title="Save session"
                    aria-label="Save"
                    icon="save"
                    size="lg"
                  />
                </IconButton>
              ) : (
                <IconButton
                  onClick={handleEditSession}
                  data-id={id}
                  data-date={date}
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
              <IconButton onClick={handleDeleteSession} data-id={id}>
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
