import Link from 'next/link';
import moment from 'moment';
import { arrayOf, shape, string } from 'prop-types';
import { ListItem, Anchor, List, Text } from './style';

const SessionsList = ({ sessions = [] }) => {
  const formatDate = date => {
    const m = moment(date, 'YYYY-MM-DD');

    return m.format('dddd Do MMMM');
  };

  return (
    <List>
      {sessions.map(session => {
        const { id, date } = session;
        return (
          <ListItem key={id}>
            <Link href="/session/[id]" as={`/session/${id}`}>
              <Anchor>
                <Text>{formatDate(date)}</Text>
                <Text>{'>'}</Text>
              </Anchor>
            </Link>
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
      date: string
    })
  )
};

export default SessionsList;
