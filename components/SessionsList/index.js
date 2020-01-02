import Link from 'next/link';
import moment from 'moment';
import { arrayOf, shape, string } from 'prop-types';
import { ListItem, Anchor, List, Text } from './style';

const SessionsList = ({ loading, error, sessions = [] }) => {
  const formatDate = date => {
    const m = moment(date, 'YYYY-MM-DD');

    return m.format('dddd Do MMMM');
  };

  if (loading) return <div>loading</div>;
  if (error) return <div>error fetching sessions</div>;

  return (
    <List>
      {sessions.map(session => {
        const { id, date } = session;
        return (
          <ListItem key={id}>
            <Link href="/exercises/[id]" as={`/exercises/${id}`}>
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
