import { useState, useEffect } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

const [dark, light] = ['dark', 'light'];
const theme = 'theme';

const ThemeToggleButton = () => {
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
    if (!t) return light;

    if (t === dark) return dark;

    return light;
  };

  const enableDarkTheme = () => {
    const root = document.getElementById('root');
    root?.classList.add(dark);
    localStorage.setItem(theme, dark);
    setCurrentTheme(dark);
  };

  const disableDarkTheme = () => {
    const root = document.getElementById('root');
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

  return (
    <div
      className='p-2 rounded-lg shadow-md bg-gray-100 dark:bg-neutral-700 dark:text-neutral-50'
      onClick={toggleTheme}
    >
      {currentTheme === light ? (
        <SunIcon className='h-7' />
      ) : (
        <MoonIcon className='h-7' />
      )}
    </div>
  );
};

export default ThemeToggleButton;
