import { useRouter } from 'next/router';
import { Layout } from '../../../../components';
import exerciseToSet from '../../../../util/mapExerciseToSetType';

const Sets = () => {
  const router = useRouter();
  const { id, title } = router.query;

  const SetLayout = exerciseToSet[title];

  return (
    <Layout title={title}>
      <SetLayout exerciseID={id} />
    </Layout>
  );
};

export default Sets;
