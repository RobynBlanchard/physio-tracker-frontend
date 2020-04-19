import { useRouter } from 'next/router';
import { Layout } from '../../../../components';
import { exerciseToSet, formatExercise } from '../../../../util';

const Sets = () => {
  const router = useRouter();
  const { id, title } = router.query;
  
  const formattedTitle = formatExercise(title);
  const SetLayout = exerciseToSet[title];

  return (
    <Layout title={formattedTitle} >
            {/* TODO just one layout */}

      <SetLayout exerciseID={id} />
    </Layout>
  );
};

export default Sets;
