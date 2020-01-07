import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useState } from 'react';
import { Layout, NavigationTab, Table, Button } from '../';
// import exerciseToSet from '../../../util/mapExerciseToSetType';

const GET_SETS = gql`
  query($exerciseID: ID!) {
    sets(exerciseID: $exerciseID) {
      ... on WeightMachineSet {
        # id
        leg
        set {
          weight
          reps
        }
      }
    }
  }
`;

const Sets = ({exerciseID}) => {
  console.log('=========sets!', exerciseID)
  // const setsInterfaceType = exerciseToSet[id];

  const { loading, error, data } = useQuery(GET_SETS, {
    variables: { exerciseID: exerciseID }
  });

  // const chooseLayout = () => {
  //   if ()
  // }

  console.log(data);

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
    <div>
      {/* <NavigationTab tabHeadings={tabHeadings} contentPanes={content} /> */}
      {/* {chooseLayout()} */}
      {/* {data && data.sets.map(set => <div>leg: {set</div>)} */}
      <div className="button-align">
        <Button>Add set +</Button>
      </div>
      <style jsx>{`
        .button-align {
          width: 100%;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Sets;