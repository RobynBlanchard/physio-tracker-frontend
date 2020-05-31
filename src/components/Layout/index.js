import { ThemeProvider } from 'styled-components';
import { string, node, bool } from 'prop-types';
import Header from '../Header';
import Navigation from '../Navigation';
import theme from '../../styles/theme';
import '../Icons';
import { ContentContainer, LayoutContainer, Loading } from './style';

const Layout = ({ title, isLoading, children }) => (
  <LayoutContainer>
    <ThemeProvider theme={theme}>
      {isLoading && (
        <Loading className="spinner" icon="spinner" size="lg" pulse />
      )}
      <ContentContainer>
        <Header title={title} />
        {children}
      </ContentContainer>
      <Navigation />
    </ThemeProvider>
    <style jsx global>
      {`
        * {
          margin: 0;
          padding: 0;
          border: 0;
          font-family: varela round, sans-serif;
        }

        html {
          height: auto;
        }

        @media screen and (min-width: 768px) {
          body {
            background-image: linear-gradient(
                to bottom,
                rgb(5, 117, 230, 0.9),
                rgb(2, 27, 121, 0.9)
              ),
              url(images/page-background-desktop.jpg);
          }
        }

        @media screen and (max-width: 768px) {
          body {
            background-image: linear-gradient(
                to bottom,
                rgb(5, 117, 230, 0.9),
                rgb(2, 27, 121, 0.9)
              ),
              url(images/page-background-mobile.jpg);
          }
        }

        body {
          background-attachment: fixed;
          background-size: cover;
          background-repeat: no-repeat;
        }
      `}
    </style>
  </LayoutContainer>
);

Layout.defaultProps = {
  title: '',
  children: false,
  isLoading: false,
};

Layout.propTypes = {
  title: string,
  children: node,
  isLoading: bool,
};

export default Layout;
