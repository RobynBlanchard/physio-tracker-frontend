import React from 'react';
import theme from '../styles/theme';
import { Layout } from '../components';
import '../components/Icons';

const Home = () => (
  <Layout backgroundID={1}>
    <div className="content">
      <h1>Physio Tracker</h1>
    </div>

    <style jsx>{`
      .content {
        text-align: center;
        padding-top: 26px;
      }

      h1 {
        color: ${theme.colors.white};
        font-size: 64px;
        letter-spacing: 4px;
      }
    `}</style>
  </Layout>
);

export default Home;
