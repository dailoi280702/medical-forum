import { useState, useEffect } from 'react';

const [dark, light] = ['dark', 'light'];
const theme = 'theme';

const ToggleThemeHook = () => {
  const [currentTheme, setCurrentTheme] = useState(light);

  useEffect(() => {
    const t = getTheme();

    if (t === dark) {
      enableDarkTheme();
      return;
    }

    disableDarkTheme();
  }, []);

  const getTheme = () => {
    const t = localStorage.getItem(theme);
    if (!t) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches)
        return dark;
      return light;
    }
    return t;
  };

  const enableDarkTheme = () => {
    const root = document.documentElement;
    root?.classList.add(dark);
    localStorage.setItem(theme, dark);
    setCurrentTheme(dark);
  };

  const disableDarkTheme = () => {
    const root = document.documentElement;
    root?.classList.remove(dark);
    localStorage.setItem(theme, light);
    setCurrentTheme(light);
  };

  const toggleTheme = () => {
    if (currentTheme === dark) {
      disableDarkTheme();
      return;
    }

    enableDarkTheme();
  };

  return {
    dark: currentTheme === dark,
    toggleTheme,
  };
};

export default ToggleThemeHook;
