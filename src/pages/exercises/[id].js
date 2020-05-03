import { useRouter } from 'next/router';
import ExercisePage from '../../PageTemplates/ExercisePage';
import { Layout } from '../../components';

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
