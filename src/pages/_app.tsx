import App from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Global, ThemeProvider } from '@emotion/react';
import wrapper from '../redux/store';

import '../styles/theme/global.scss';
import '../styles/theme/common.css';
import theme from '../styles/theme';
import fonts from '../styles/fonts';
import colors from '../styles/theme/colors';
import { initFacebookSdk } from '../services';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    initFacebookSdk();
    return (
      <ThemeProvider theme={{ colors }}>
        <ChakraProvider resetCSS={true} theme={theme}>
          <Global styles={fonts} />
          <Component {...pageProps} />
        </ChakraProvider>
      </ThemeProvider>
    );
  }
}

export default wrapper.withRedux(MyApp);
