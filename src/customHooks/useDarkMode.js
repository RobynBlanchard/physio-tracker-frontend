import { useEffect, useState } from 'react';

export default () => {
  const [theme, setTheme] = useState('light');

  const setMode = (mode) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const themeToggler = () => {
    console.log('switched');
    if (theme === 'light') {
      console.log('set dark');
      setMode('dark');
    } else {
      console.log('set light');

      setMode('light');
    }
  };

  useEffect(() => {
    console.log('mount');
    const localTheme = window.localStorage.getItem('theme');
    console.log('localTheme', localTheme);

    if (localTheme) {
      setTheme(localTheme);
    }
  }, []);
  return [theme, themeToggler];
};
