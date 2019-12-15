import Router, { withRouter } from 'next/router';
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

export default withRouter(Header);
