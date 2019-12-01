import React from 'react';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';

const Nav = ({ router }) => (
  <nav>
    <ul>
      {router.pathname !== '/' && (
        <li>
          <a onClick={() => Router.back()}>Back</a>
        </li>
      )}

      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/sessions">
          <a>Sessions</a>
        </Link>
      </li>
    </ul>

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
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </nav>
);

export default withRouter(Nav);
