import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Layout } from '../components';
import '../components/Icons';

const swipe = keyframes`
    to {
		background-position: 200% center;
	}
`;

const Heading = styled.h1`
  text-shadow: 1px 1px 0px;
  font-size: 50px;
  margin: 30px;
  letter-spacing: 4px;
  font-family: varela round, sans-serif;
  text-transform: uppercase;
  background: linear-gradient(to right, #fff, silver 50%, #fff);
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: ${({ theme }) => theme.colors.white};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${swipe} 3s linear;
`;

const Home = () => (
  <Layout backgroundID={1}>
    <div className="heading-wrapper">
      <Heading>Physio Tracker</Heading>
    </div>

    <style jsx>
      {`
        .heading-wrapper {
          text-align: center;
          padding-top: 26px;
        }
      `}
    </style>
  </Layout>
);

export default Home;
