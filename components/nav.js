import React from 'react';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

library.add(faArrowLeft);

import styled from 'styled-components';
const StyledIcon = styled(FontAwesomeIcon)`
  color: white;
  width: 20px;
  margin-right: 10px;
  margin: 0 18px;
`;

const Heading = styled.h1`
  color: white;
  font-size: 40px;
  margin-bottom: 20px;
  /* text-align: center; */
`;

const Anchor = styled.a`
  /* float: left; */
  padding-right: 20px;
  color: white;
`;
// header
const Nav = ({ router, title }) => (
  <div>
    <Heading>
      {router.pathname !== '/' && (
        <Anchor onClick={() => Router.back()}>
          <StyledIcon icon="arrow-left" />
        </Anchor>
      )}
      {title}
    </Heading>
    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      svg {
        color: white;
        width: 20px;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: white;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </div>
);

export default withRouter(Nav);
