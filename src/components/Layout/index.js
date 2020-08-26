import { string, node, bool } from 'prop-types';
import Header from '../Header';
import Navigation from '../Navigation';
import '../Icons';
import { ContentContainer, LayoutContainer, Loading } from './style';

const Layout = ({ title, isLoading, children }) => {
  return (
    <LayoutContainer>
      {isLoading && (
        <Loading className="spinner" icon="spinner" size="lg" pulse />
      )}
      <ContentContainer>
        <Header title={title} />
        {children}
      </ContentContainer>
      <Navigation />
      <style jsx global>
        {`
          * {
            margin: 0;
            padding: 0;
            border: 0;
            font-family: varela round, sans-serif;
          }

          #__next {
            height: 100%;
          }

          html {
            // height: calc(100% - 60px);
          }

          .toggle-switch-align {
            position: absolute;
            // bottom: 8px;
            right: 8px;
          }
        `}
      </style>
    </LayoutContainer>
  );
};

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
