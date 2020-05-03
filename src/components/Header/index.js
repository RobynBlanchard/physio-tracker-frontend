import { memo } from 'react';
import Router, { withRouter } from 'next/router';
import { string, shape } from 'prop-types';
import { Heading, Anchor, StyledIcon } from './style';

const Header = ({ router, title }) => {
  return (
    <div>
      <Heading>
        {router && router.pathname !== '/' && (
          <Anchor onClick={() => Router.back()}>
            <StyledIcon icon="arrow-left" />
          </Anchor>
        )}
        {title}
      </Heading>
    </div>
  );
};

Header.defaultProps = {
  title: '',
};

Header.propTypes = {
  router: shape({ pathname: string }).isRequired,
  title: string,
};

export default withRouter(memo(Header));
