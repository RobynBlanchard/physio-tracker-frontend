import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useState } from 'react';
import { Layout, NavigationTab, Table, Button, SetFreeWeights, SetTimeDistance, SetWeightMachine } from '../../../../components';
import exerciseToSet from '../../../../util/mapExerciseToSetType';


const GET_SETS = gql`
  query($exerciseID: ID!) {
    sets(exerciseID: $exerciseID) {
      weight
      reps
    }
  }
`;

const Sets = () => {
  const router = useRouter();
  const { id, title } = router.query;

  console.log('ID-------------', id);
  console.log('title-------------', title);

  // const setsInterfaceType = exerciseToSet[id];

  // const { loading, error, data } = useQuery(GET_SETS, {
  //   variables: { exerciseID: "1" }
  // });
  console.log('111', exerciseToSet[id])

  const chooseLayout = () => {
    if (exerciseToSet[title] === 'FreeWeightsSet') {
      return <SetFreeWeights exerciseID={id}/>
    }
    if (exerciseToSet[title] === 'TimeDistanceSet') {
      return <SetTimeDistance exerciseID={id}/>
    }
    if (exerciseToSet[title] === 'WeightMachineSet') {
      console.log('111')
      return <SetWeightMachine exerciseID={id}/>
    }
  }

  // console.log(data);

  // const tabHeadings = [
  //   { id: 'bothLegs', title: 'Both legs' },
  //   { id: 'leftLeg', title: 'Left leg' },
  //   { id: 'rightLeg', title: 'Right leg' }
  // ];

  // const headings = [
  //   { colID: 'setNum', name: 'Set' },
  //   { colID: 'weight', name: 'Weight' },
  //   { colID: 'reps', name: 'Reps' }
  // ];

  // const content = {
  //   bothLegs: <Table tableHeadings={headings} rowData={data[0].sets} />,
  //   leftLeg: <Table tableHeadings={headings} rowData={data[1].sets} />,
  //   rightLeg: <Table tableHeadings={headings} rowData={data[2].sets} />
  // };

  return (
    <Layout title={title}>
      {/* <NavigationTab tabHeadings={tabHeadings} contentPanes={content} /> */}
      {chooseLayout()}
      {/* <div className="button-align">
        <Button>Add set +</Button>
      </div> */}
      <style jsx>{`
        .button-align {
          width: 100%;
          text-align: center;
        }
      `}</style>
    </Layout>
  );
};

export default Sets;
