import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { getSessions } from '../../api';
import Link from 'next/link';

const Session = ({ session }) => {
  // TODO: button to toggle expand of averages

  return (
    <Layout>
      {session.exercises.map(exercise => {
        return (
          <>
            <Link
              href="/session/exercise/[id]"
              as={`/session/exercise/${exercise.name}`}
            >
              <a>
                <h3>{exercise.name}</h3>
              </a>
            </Link>
            {/* TODO put averages here */}
            <p>L: 20kg, 5 reps, 3 sets</p>
            <p>R: 20kg, 5 reps, 3 sets</p>
            <p>Both: 60kg, 5 reps, 3 sets</p>
          </>
        );
      })}
      <style jsx>{`
        p {
          font-size: 12px;
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
