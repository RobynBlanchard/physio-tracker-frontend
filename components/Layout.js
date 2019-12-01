import {ThemeProvider} from 'styled-components';
import Nav from './Nav';
import Head from 'next/head';
import { colors, theme } from '../styles';
const layoutStyle = {
  margin: 20
};

const Layout = props => (
  <div style={layoutStyle}>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <ThemeProvider theme={theme}>
      <Nav />
      {props.children}
    </ThemeProvider>
    <style jsx global>{`
      html,
      body {
        height: 100%;
      }
      body {
      }

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
