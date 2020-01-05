import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useState } from 'react';
import { Layout, NavigationTab, Table, Button } from '../../../components';

const GET_SETS = gql`
  query($exerciseID: ID!) {
    sets(exerciseID: $exerciseID) {
      ... on TimeDistanceSet {
        time
        distance
      }
    }
  }
`;

const Sets = () => {
  const router = useRouter();
  const { id } = router.query;
  // should pass in eercise id 

  console.log('ID-------------', id);

  const { loading, error, data } = useQuery(GET_SETS, {
    variables: { exerciseID: '1' }
  });

  console.log(data);

  return (
    <Layout title={id}>
      {/* <NavigationTab tabHeadings={tabHeadings} contentPanes={content} /> */}
      {data && data.sets.map(set => (
        <div>
          time: {set.time} distance: {set.distance}
        </div>
      ))}
      <div className="button-align">
        <Button>Add thing +</Button>
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

export default Sets;
