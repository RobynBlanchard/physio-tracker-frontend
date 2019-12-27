import { Layout, Button, Exercises as ExercisesList } from '../../components';
import { getSessions } from '../../api';

const Exercises = ({ session }) => {
  return (
    <Layout title={'Your workout'}>
      <ExercisesList exercises={session.exercises} />
      <div className="button-align">
        <Button>Add exercise +</Button>
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

Exercises.getInitialProps = async props => {
  const userId = 123;
  const res = await getSessions(userId, props.query.id);

  return { session: res };
};

export default Exercises;
