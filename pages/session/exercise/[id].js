import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import NavigationTab from '../../../components/NavigationTab';
import SetsTable from '../../../components/Table';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Button = styled.button`
width: 80%;
    border: none;
    font-family: inherit;
    font-size: 14px;
    color: inherit;
    background: none;
    cursor: pointer;
    padding: 20px 40px;
    display: inline-block;
    margin: 15px 30px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    outline: none;
    position: relative;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
    border-radius: 50px;
    border: 3px solid #fff;
    color: #fff;
    overflow: hidden;
    /* width:  */
    background: #1d75c7;

    &:hover {
      /* background: #1a7ac8; */
      background: #2553bc;
    }
`;

const Exercise = () => {
  const router = useRouter();
  const { id } = router.query
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
    <Layout title={id}>
      <NavigationTab tabHeadings={tabHeadings} contentPanes={content} />
      <div style={{width: '100%', textAlign: "center"}}><Button >Add exercise +</Button></div>
    </Layout>
  );
};

export default Exercise;
