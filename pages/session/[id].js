import { Layout, Button, Exercises } from '../../components';
import { getSessions } from '../../api';

const Session = ({ session }) => {
  return (
    <Layout title={'Your workout'}>
      <Exercises exercises={session.exercises} />
      <div className="button-align">
        <Button text="Add exercise +" />
      </div>
      <style jsx>{`
        .button-align {
          width: 100%;
          text-align: center;
        }
      `}</style>
    </Layout>
  );
};

Session.getInitialProps = async props => {
  const userId = 123;
  const res = await getSessions(userId, props.query.id);

  return { session: res };
};

export default Session;
