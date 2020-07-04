import React from 'react';
import { func, string } from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { Layout, ToggleSwitch } from '../components';
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
  color: ${({ theme }) => theme.colors.text};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${swipe} 3s linear;
`;

const ToggleAlign = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.text};
  align-items: center;
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.XS};
`;

const Home = ({ themeToggler, theme }) => {
  return (
    <Layout backgroundID={1} theme={theme}>
      <div className="heading-wrapper">
        <Heading>Physio Tracker</Heading>
      </div>
      <ToggleAlign>
        <h3>Toggle theme:</h3>
        &nbsp;
        <ToggleSwitch
          onClick={themeToggler}
          enabledByDefault={theme === 'dark'}
        />
      </ToggleAlign>

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
};

Home.defaultProps = {
  themeToggler: () => {},
  theme: 'light',
};

Home.propTypes = {
  themeToggler: func,
  theme: string,
};

export default Home;
