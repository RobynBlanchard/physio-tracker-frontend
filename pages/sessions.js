import { Layout, List, Button } from '../components';
import { getSessions } from '../api';
import { formatDate } from '../utils/formatDate';

function Sessions({ sessions }) {
  return (
    <Layout title={'Sessions'}>
      <List items={sessions} applyFunc={items => formatDate(items.date)} />
      <div className="button-align">
        <Button text="Add session +" />
      </div>
      <style jsx>{`
        .button-align {
          width: 100%;
          text-align: center;
        }
      `}</style>
    </Layout>
  );
}

Sessions.getInitialProps = async () => {
  const userId = 123;
  const res = await getSessions(userId);

  return { sessions: res };
};

export default Sessions;
