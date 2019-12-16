import Router, { withRouter } from 'next/router';
import { string } from 'prop-types';
import { Heading, Anchor, StyledIcon } from './style';

const Header = ({ router, title }) => (
  <div>
    <Heading>
      {router.pathname !== '/' && (
        <Anchor onClick={() => Router.back()}>
          <StyledIcon icon="arrow-left" />
        </Anchor>
      )}
      {title}
    </Heading>
  </div>
);

Header.propTypes = {
  router: {
    pathname: string
  },
  title: string
};

export default withRouter(Header);
