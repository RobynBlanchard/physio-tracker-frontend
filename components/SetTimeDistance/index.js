import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useState } from 'react';
import { Layout, NavigationTab, Table, Button } from '../index';

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

const Sets = ({exerciseID}) => {
  // should pass in eercise id 

  console.log('ID-------------', id);

  const { loading, error, data } = useQuery(GET_SETS, {
    variables: { exerciseID: exerciseID }
  });

  console.log(data);

  return (
    <div>
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
    </div>
  );
};

export default Sets;
