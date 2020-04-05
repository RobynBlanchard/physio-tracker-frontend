import { ThemeProvider } from 'styled-components';
import { string, node, number } from 'prop-types';
import Header from '../Header';
import Navigation from '../Navigation';
import theme from '../../styles/theme';
import '../Icons';
import { ContentContainer, NavContainer, LayoutContainer } from './style';

const Layout = ({ title, children }) => {
  return (
    <LayoutContainer>
      <ThemeProvider theme={theme}>
        <ContentContainer>
          <Header title={title} />
          {children}
        </ContentContainer>
        <NavContainer>
          <Navigation />
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
          background: linear-gradient(${theme.colors.primary}, ${theme.colors.secondary}, ${theme.colors.teritary});
        }
      `}</style>
    </LayoutContainer>
  );
};

Layout.propTypes = {
  title: string,
  children: node
};

export default Layout;
