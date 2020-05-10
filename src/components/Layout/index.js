import styled, { ThemeProvider } from 'styled-components';
import { string, node } from 'prop-types';
import Header from '../Header';
import Navigation from '../Navigation';
import theme from '../../styles/theme';
import '../Icons';
import { ContentContainer, NavContainer, LayoutContainer } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Loading = styled(FontAwesomeIcon)`
  position: absolute;
  left: 50%;
  top: 40%;

  color: white;
`;

const Layout = ({ title, isLoading, children }) => (
  <LayoutContainer>
    <ThemeProvider theme={theme}>
      {isLoading && (
        <Loading
          className="spinner"
          // aria-hidden="true"
          // aria-label="Edit"
          icon="spinner"
          size="lg"
          pulse
          // title={title}
          // fill={fill}
        />
      )}
      {/* <div className="overlay">
        <FontAwesomeIcon
          className="spinner"
          // aria-hidden="true"
          // aria-label="Edit"
          icon="spinner"
          size="lg"
          pulse
          // title={title}
          // fill={fill}
        />
      </div> */}
      <ContentContainer>
        <Header title={title} />
        {children}
      </ContentContainer>
      <NavContainer>
        <Navigation />
      </NavContainer>
    </ThemeProvider>
    <style jsx global>
      {`
        // .overlay {
        //   position: fixed;
        //   width: 100%;
        //   height: 100%;
        //   background: grey;
        //   opacity: 0.1;
        //   z-index: 1;
        // }
        // .spinner {
        //   position: relative;
        //   left: 50%;
        //   right: 50%;
        //   top: 50%;
        //   color: white;
        // }
        * {
          margin: 0;
          padding: 0;
          border: 0;
         font-family: varela round, sans-serif;

        }

        #__next {
          height: 100%;
        }

        html,
        body {
          height: 100%;
  // font-family: varela round, sans-serif;

        }

        @media screen and (min-width: 768px) {
          body {
          background-image: linear-gradient(to bottom,rgb(5,117,230,0.9),rgb(2,27,121,0.9)), url(images/runnJpg.jpg);
          }
        }

        @media screen and (max-width: 768px) {
          body {
          background-image: linear-gradient(to bottom,rgb(5,117,230,0.9),rgb(2,27,121,0.9)), url(images/runnmobjpg.jpg);
          }
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
            Helvetica, sans-serif;
            // background: linear-gradient(to bottom, rgb(15, 12, 41), rgb(48, 43, 99), rgb(36, 36, 62));
            // background: linear-gradient(to bottom, rgb(5, 117, 230), rgb(2, 27, 121));

            // background: linear-gradient(to bottom, rgb(5, 117, 230), rgb(2, 27, 121), url('images/run.jpg') no-repeat;
            // background-image: url("images/run.jpg"), linear-gradient(rgb(5, 117, 230), rgb(2, 27, 121));
    //         height: 200px;
    //         background-size: cover;

    //         background-image: linear-gradient(to bottom, rgb(5, 117, 230, 0.9), rgb(2, 27, 121, 0.9)),
    // url('images/runn2.webp');

    // background-image: linear-gradient(to bottom,rgb(5,117,230,0.9),rgb(2,27,121,0.9)), url(images/runn2.webp);

    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 100vh;
    font-family: -apple-system,BlinkMacSystemFont,Avenir Next,Avenir, Helvetica,sans-serif;
    height: 200px;
    /* background-size: cover; */

   
          }
        }
      `}
    </style>
  </LayoutContainer>
);

Layout.defaultProps = {
  title: '',
  children: false,
};

Layout.propTypes = {
  title: string,
  children: node,
};

export default Layout;
