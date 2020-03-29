import React from 'react';
import { colors, theme } from '../styles';
import { Layout } from '../components';
import '../components/Icons';

const Home = props => (
  <Layout userAuthenticated={props.userAuthenticated} backgroundID={1}>
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
