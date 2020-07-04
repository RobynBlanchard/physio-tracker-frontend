/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';
import Head from 'next/head';
import { AuthProvider } from '../customHooks/useAuth';
import withData from '../api/apollo-client';
import useDarkMode from '../customHooks/useDarkMode';
import { media } from '../styles/breakpoints';
import setTheme from '../styles/theme';
// import App from 'next/app';

const GlobalStyles = createGlobalStyle`
  body {
    background-attachment: fixed;
    background-size: cover;
    background-repeat: no-repeat;
    background-image:  ${(props) =>
      `linear-gradient(to bottom, ${props.theme.colors.backgroundGradient2}, ${props.theme.colors.backgroundGradient1}), url(images/page-background-mobile.jpg)`};

    ${media.tablet`
      background-image:  ${(props) =>
        `linear-gradient(to bottom, ${props.theme.colors.backgroundGradient2}, ${props.theme.colors.backgroundGradient1}), url(images/page-background-desktop.jpg)`};
    `}
    height: 100%;
  }
`;
function MyApp({ Component, pageProps, apolloClient }) {
  const [theme, themeToggler] = useDarkMode();

  return (
    <>
      <Head>
        <title>Home</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
        />
      </Head>
      <ApolloProvider client={apolloClient}>
        <AuthProvider>
          <ThemeProvider theme={setTheme(theme)}>
            <GlobalStyles />
            <Component
              {...pageProps}
              themeToggler={themeToggler}
              theme={theme}
            />
          </ThemeProvider>
        </AuthProvider>
      </ApolloProvider>
    </>
  );
}

export default withData(MyApp);
