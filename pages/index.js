import React from 'react';
import { colors } from '../styles';
import Layout from '../components/Layout';

const Home = () => (
  <div>
    <Layout>
      <div className="content">
        <h1>Welcome to Physio Tracker!</h1>
        <h2>🏃‍♀️</h2>
      </div>
    </Layout>

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
