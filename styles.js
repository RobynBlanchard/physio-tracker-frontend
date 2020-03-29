import styled from 'styled-components';

export const theme = {
  colors: {
    primary: '#7433dd',
    primaryDark: '#9013fe',
    secondary: '#576cdf',
    white: '#fff',
    darkestGrey: '#323337',
    darkGrey: '#858891',
    grey: '#C3C4C3',
    lightestGrey: '#E9E9E9',
    red: '#F74444',
  },
  spacing: {
    XS: '8px',
    S: '12px',
    M: '14px',
    L: '16px'
  },
  font: {
    size: {
      M: '14px',
      L: '16px',
      XL: '20px'
    },
    weight: {
      M: 600,
      L: 700
    }
  }
};

export const InformationText = styled.p`
  font-size: 16px;
  color: ${theme.colors.lightestGrey};
`;

export const ErrorText = styled.p`
  font-size: 16px;
  color: ${theme.colors.red};
`;

export const breakpoints = {
  tablet: 768,
  desktop: 960,
};