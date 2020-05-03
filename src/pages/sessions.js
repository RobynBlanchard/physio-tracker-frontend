import { Layout } from '../components';
import SessionPage from '../PageTemplates/SessionPage';

function Sessions() {
  return (
    <Layout title="Sessions" backgroundID={2}>
      <SessionPage />
    </Layout>
  );
}

export default Sessions;
