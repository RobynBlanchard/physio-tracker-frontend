import { useRouter } from 'next/router';
import { Layout, ExercisePage } from '../../components';

const Exercises = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout title="Your workout" backgroundID={3}>
      <ExercisePage sessionID={id} />
    </Layout>
  );
};

export default Exercises;
