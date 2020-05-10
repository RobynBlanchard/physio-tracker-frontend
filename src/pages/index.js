import React from 'react';
import styled, { keyframes } from 'styled-components';
import theme from '../styles/theme';
import { Layout } from '../components';
import '../components/Icons';

const swipe = keyframes`
    to {
		background-position: 200% center;
	}
`;

const Heading = styled.h1`
 text-shadow: 1px 1px 0px;  
  /* color: ${theme.colors.white}; */
  font-size: 50px;
  margin: 30px;
  letter-spacing: 4px;
  font-family: varela round, sans-serif;
  text-transform: uppercase;

  color: #fff;

		/* font-size: 92px; */
		/* font-family: "ubuntu"; */
		/* text-transform: uppercase; */
		/* font-weight: 700; */
		/* font-family: "Josefin Sans", sans-serif; */
		background: linear-gradient(to right, #fff, silver 50%, #fff);
		background-size: auto auto;
		background-clip: border-box;
		background-size: 200% auto;
		color: #fff;
    /* color: transparent; */
		background-clip: text;
		/* text-fill-color: transparent; */
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: ${swipe} 3s linear ;
`;

const Home = () => (
  <Layout backgroundID={1}>
    <div className="content">
      <Heading>Physio Tracker</Heading>
    </div>

    <style jsx>
      {`
        .content {
          text-align: center;
          padding-top: 26px;
        }

        // h1 {
        //   color: ${theme.colors.white};
        //   font-size: 64px;
        //   letter-spacing: 4px;
        //   font-family: varela round, sans-serif;
        //   text-transform: uppercase;
        // }
      `}
    </style>
  </Layout>
);

export default Home;
