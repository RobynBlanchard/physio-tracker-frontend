import { useRouter } from 'next/router';
import { Layout } from '../../../../../components';
import { exerciseToSet, formatExercise } from '../../../../../util';
import SetsLayout from '../../../../../components/Sets';
const Sets = () => {
  const router = useRouter();
  const { id, title, metrics } = router.query;
  console.log('metrics', metrics)
  const formattedTitle = formatExercise(title);
  // const SetsLayout = exerciseToSet[title];

  return (
    <Layout title={formattedTitle}>
      {/* TODO just one layout */}
      <SetsLayout exerciseID={id} metrics={metrics} />
      {/* <Set  Layout exerciseID={id} /> */}
    </Layout>
  );
};

export default Sets;
