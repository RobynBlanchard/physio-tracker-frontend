import { Layout, List, Button} from '../components';
import { getSessions } from '../api';
import { formatDate } from '../utils/formatDate';

function Sessions({ sessions }) {
  return (
    <Layout title={'Sessions'}>
      <List items={sessions} applyFunc={items => formatDate(items.date)} />
      <Button text="Add session +" />
    </Layout>
  );
}

Sessions.getInitialProps = async () => {
  const userId = 123;
  const res = await getSessions(userId);

  return { sessions: res };
};

export default Sessions;
