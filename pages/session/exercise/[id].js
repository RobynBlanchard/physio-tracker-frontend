import { Layout, NavigationTab, Table, Button } from '../../../components';
import { useRouter } from 'next/router';
import { getSets } from '../../../api';

const Exercise = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;

  const tabHeadings = [
    { id: 'bothLegs', title: 'Both legs' },
    { id: 'leftLeg', title: 'Left leg' },
    { id: 'rightLeg', title: 'Right leg' }
  ];

  const headings = [
    { colID: 'setNum', name: 'Set' },
    { colID: 'weight', name: 'Weight' },
    { colID: 'reps', name: 'Reps' }
  ];

  const content = {
    bothLegs: <Table tableHeadings={headings} rowData={data[0].sets} />,
    leftLeg: <Table tableHeadings={headings} rowData={data[1].sets} />,
    rightLeg: <Table tableHeadings={headings} rowData={data[2].sets} />
  };

  return (
    <Layout title={id}>
      <NavigationTab tabHeadings={tabHeadings} contentPanes={content} />
      <div className="button-align">
        <Button>Add set +</Button>
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

Exercise.getInitialProps = async props => {
  const res = await getSets(props.query.id);

  return { data: res };
};

export default Exercise;
