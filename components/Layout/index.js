import { ThemeProvider } from 'styled-components';
import Header from '../Header';
import Head from 'next/head';
import Navigation from '../Navigation';
import { theme } from '../../styles';

import '../Icons';

const Layout = ({ title, children }) => (
  <div className="layout-container">
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
    </Head>
    <ThemeProvider theme={theme}>
      <div className="container">
        <Header title={title} />
        {children}
      </div>
      <div className="nav-container">
        <Navigation />
      </div>
    </ThemeProvider>
    <style jsx global>{`
      * {
        margin: 0;
        padding: 0;
        border: 0;
      }

      html,
      body {
        height: 100%;
      }

      .layout-container {
        padding: 20px;
      }

      body {

        //   background-image: linear-gradient(
        //     to bottom,
        //     rgba(20, 136, 204, 0.7),
        //     rgba(43, 50, 178, 0.8)
        //   ),
        //   url(/weights-image.jpg);
        // background-size: cover;

        background: linear-gradient(to bottom, #1488cc, #2b32b2);
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }

      .nav-container {
        margin-bottom: 20px;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
      }
    `}</style>
  </div>
);

export default Layout;
