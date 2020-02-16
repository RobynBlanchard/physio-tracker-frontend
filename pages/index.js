import React from 'react';
import { colors } from '../styles';
import { Layout } from '../components';
import '../components/Icons';

const Home = (props) => (
  <Layout userAuthenticated={props.userAuthenticated}>
      <div className="content">
        <h1>Physio Tracker</h1>
      </div>

    <style jsx>{`
      .content {
        color: ${colors.primary};
        text-align: center;
        padding-top: 26px;
      }

      h1 {
        color: white;
        font-size: 64px;
        letter-spacing: 4px;
        text-shadow: 4px 4px #212b8f;
      }
    `}</style>
    </Layout>
);

export default Home;
