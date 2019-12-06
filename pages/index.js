import React from 'react';
import { colors } from '../styles';
import LayoutHome from '../components/LayoutHome';

const Home = () => (
  // <div>
    <LayoutHome>
      <div className="content">
        <h1>Physio Tracker</h1>
        {/* <h2>🏃‍♀️</h2> */}
      </div>

    <style jsx>{`
      .content {
        color: ${colors.primary};
        text-align: center;
        padding-top: 26px;
      }

      // body {
      //   background-image: linear-gradient(
      //     to bottom,
      //     rgba(20, 136, 204, 0.7),
      //     rgba(43, 50, 178, 0.8)
      //   ),
      //   url(/evan-wise-wTcD3MwL_VY-unsplash.jpg);
      // background-size: cover;
      // height: 100%;
      // }

      h1 {
        color: white;
        font-size: 64px;
        letter-spacing: 4px;
        text-shadow: 4px 4px #212b8f;
        // text-transform: uppercase;
        // font-family: "Arial Black", Gadget, sans-serif;
      }
    `}</style>
    </LayoutHome>

  // </div>
);

export default Home;

// victor-freitas-Pnm-9vBEQhk-unsplash

// background-image: url("/victor-freitas-Pnm-9vBEQhk-unsplash.jpg"), linear-gradient(to bottom,#1488cc,#2b32b2);

// background-image: url("/evan-wise-wTcD3MwL_VY-unsplash.jpg"), linear-gradient(to bottom,#1488cc,#2b32b2);


// background-image:
// linear-gradient(to bottom, rgba(20, 136, 204, 0.7), rgba(43, 50, 178, 0.6)),
// url('images/background.jpg');

