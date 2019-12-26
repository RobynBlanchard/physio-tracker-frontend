import App from 'next/app';
import { withApollo } from '../util/apollo-client';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Component {...pageProps} />
    );
  }
}

export default withApollo(MyApp);

// TODO: userContext - to pass through user id