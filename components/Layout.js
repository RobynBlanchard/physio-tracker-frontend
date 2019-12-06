import { ThemeProvider } from 'styled-components';
import Nav from './Nav';
import Head from 'next/head';
import { colors, theme } from '../styles';
import Navigation from './Navigation';
const layoutStyle = {
  // margin: 20
};

const Layout = props => (
  <div style={layoutStyle}>
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
        {<Nav title={props.title} />}
        {props.children}
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
        outline: 0;
        font-size: 100%;
        vertical-align: baseline;
        background: transparent;
      }
      html {
        height: 100%;
      }
      // html,
      body {
        height: 100%;
        background: linear-gradient(to bottom, #1488cc, #2b32b2);
        // background-image: linear-gradient(
        //     to bottom,
        //     rgba(20, 136, 204, 0.7),
        //     rgba(43, 50, 178, 0.8)
        //   ),
        //   url(/evan-wise-wTcD3MwL_VY-unsplash.jpg);
        // background-size: cover;
        // height: 100%;
      }
      .container {
        margin: 20px;
      }

      .nav-container {
        margin: 20px;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
      }
      // html,
      // body {
      //   // height: 100%;
      //   background: linear-gradient(to bottom, #1488cc, #2b32b2);
      // }
      // html {
      //   height: 100%;
      // }
      // body {
      //   min-height: 100%;
      // }
      // body {
      // }

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

export default Layout;
