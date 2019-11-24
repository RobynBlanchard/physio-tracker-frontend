import Layout from '../components/Layout';
import { getSessions } from '../api';
import List from '../components/List';
import { formatDate } from '../utils/formatDate';

function Sessions({ sessions }) {
  return (
    <Layout>
      <List items={sessions} applyFunc={items => formatDate(items.date)} />
    </Layout>
  );
}

Sessions.getInitialProps = async () => {
  const userId = 123;
  const res = await getSessions(userId);

  return { sessions: res };
};

export default Sessions;
