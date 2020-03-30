import { ThemeProvider } from 'styled-components';
import { string, node, number } from 'prop-types';
import Header from '../Header';
import Navigation from '../Navigation';
// import PageBackground from '../PageBackground';
// import breakpoints from '../../styles/breakpoints';

import theme from '../../styles/theme';
import '../Icons';
import { ContentContainer, NavContainer, LayoutContainer } from './style';

const Layout = ({ title, backgroundID = 1, children }) => {
  return (
    <LayoutContainer>
      <ThemeProvider theme={theme}>
        <ContentContainer>
          <Header title={title} />
          {children}
        </ContentContainer>
        <NavContainer>
          <Navigation backgroundID={backgroundID} />
        </NavContainer>
      </ThemeProvider>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          border: 0;
        }

        #__next {
          height: 100%;
        }

        html,
        body {
          height: 100%;
        }
        @media (min-width: 500px) {
          body {
            background: lightblue url("/images/Background-${backgroundID}-desktop.png") no-repeat fixed center;
          }
        }
        @media (max-width: 500px) {
          body {
            background: lightblue url("/images/Background-${backgroundID}.png") no-repeat fixed center;
          }
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
          background-size: cover;
        }

      `}</style>
    </LayoutContainer>
  );
};

Layout.propTypes = {
  title: string,
  backgroundID: number,
  children: node
};

export default Layout;
