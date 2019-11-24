import React from 'react';
import Head from 'next/head';
import Nav from '../components/Nav';
import { colors } from '../styles';

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Nav />
    <div className="content">
      <h1>Welcome to Physio Tracker!</h1>
      <h2>🏃‍♀️</h2>
    </div>

    <style jsx>{`
      .content {
        color: ${colors.primary};
        text-align: center;
      }

      h2 {
        font-size: 64px;
      }
    `}</style>
  </div>
);

export default Home;
