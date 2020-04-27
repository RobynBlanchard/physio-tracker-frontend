/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
// eslint-disable-next-line import/no-extraneous-dependencies
import { shallow, mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';

export const mountWithTheme = (child) =>
  mount(child, {
    wrappingComponent: ({ children }) => (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    ),
  });

export const shallowWithTheme = (child) =>
  shallow(child, {
    wrappingComponent: ({ children }) => (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    ),
  });
