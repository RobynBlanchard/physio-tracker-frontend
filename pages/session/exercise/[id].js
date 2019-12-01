import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import NavigationTab from '../../../components/NavigationTab';
import SetsTable from '../../../components/Table';

const Exercise = () => {
  const data = [
    {
      title: 'Both legs',
      sets: [
        { id: 1, setNum: 1, reps: 12, weight: 36 },
        { id: 2, setNum: 2, reps: 12, weight: 34 },
        { id: 3, setNum: 3, reps: 12, weight: 34 }
      ]
    },
    {
      title: 'Left leg',
      sets: [
        { id: 4, setNum: 1, reps: 12, weight: 12 },
        { id: 5, setNum: 2, reps: 12, weight: 12 }
      ]
    },
    {
      title: 'Right leg',
      sets: [
        { id: 6, setNum: 1, reps: 12, weight: 14 },
        { id: 7, setNum: 2, reps: 12, weight: 14 }
      ]
    }
  ];

  const tabHeadings = [
    { id: 'bothLegs', title: 'Both legs' },
    { id: 'leftLeg', title: 'Left leg' },
    { id: 'rightLeg', title: 'Right leg' }
  ];

  const headings = [
    { colID: 'setNum', name: 'Set' },
    { colID: 'weight', name: 'Weight' },
    { colID: 'reps', name: 'reps' }
  ];

  const content = {
    bothLegs: <SetsTable tableHeadings={headings} rowData={data[0].sets} />,
    leftLeg: <SetsTable tableHeadings={headings} rowData={data[1].sets} />,
    rightLeg: <SetsTable tableHeadings={headings} rowData={data[2].sets} />
  };

  return (
    <Layout>
      <NavigationTab tabHeadings={tabHeadings} contentPanes={content} />
      <button style={{ width: '100%' }}>Add exercise +</button>
    </Layout>
  );
};

export default Exercise;
