import { Layout, Button, Exercises } from '../../components';
import { getSessions } from '../../api';

const Session = ({ session }) => {
  return (
    <Layout title={'Your workout'}>
      <Exercises exercises={session.exercises} />
      <Button text="Add exercise +" />
    </Layout>
  );
};

Session.getInitialProps = async props => {
  const userId = 123;
  const res = await getSessions(userId, props.query.id);

  return { session: res };
};

export default Session;
