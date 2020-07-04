const darkTheme = {
  text: '#fff',
  border: '#E9E9E9',
  backgroundGradient1: 'rgb(5, 117, 230, 0.9)',
  backgroundGradient2: 'rgb(2, 27, 121, 0.9)',
  background: '#021B79',
  backgroundSecondary: '#054ab3',
  backgroundTertiary: '#36a8e3',
};

const lightTheme = {
  text: '#021B79',
  border: '#054ab3',
  backgroundGradient1: 'rgb(233, 233, 233, 0.9)',
  backgroundGradient2: 'rgb(255, 255, 255, 0.9)',
  background: '#fff',
  backgroundSecondary: '#054ab3',
  backgroundTertiary: '#36a8e3',
};

export default (theme = 'dark') => ({
  colors: {
    darkestGrey: '#323337',
    darkGrey: '#858891',
    grey: '#C3C4C3',
    red: '#F74444',
    white: '#fff',
    ...(theme === 'dark' ? darkTheme : lightTheme),
  },
  spacing: {
    XXS: '4px',
    XS: '8px',
    S: '12px',
    M: '14px',
    L: '16px',
    XL: '20px',
  },
  font: {
    size: {
      M: '14px',
      L: '16px',
      XL: '20px',
    },
    weight: {
      M: 600,
      L: 700,
    },
  },
});
