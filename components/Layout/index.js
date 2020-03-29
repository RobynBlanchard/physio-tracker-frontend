import { ThemeProvider } from 'styled-components';
import { string, node, number } from 'prop-types';
import Header from '../Header';
import Navigation from '../Navigation';
import PageBackground from '../PageBackground';

import { theme } from '../../styles';
import '../Icons';
import { ContentContainer, NavContainer, LayoutContainer } from './style';

const Layout = ({ title, backgroundID = 1, children }) => {
  return (
    <LayoutContainer>
      <PageBackground backgroundID={backgroundID} />
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

        body {
          font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
            Helvetica, sans-serif;
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
