import { memo } from 'react';
import Router, { withRouter } from 'next/router';
import { string, shape } from 'prop-types';
import { Heading, Anchor, StyledIcon } from './style';

{
  /* <a href="https://www.freepik.com/free-photos-vectors/background">Background vector created by starline - www.freepik.com</a> */
}
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
