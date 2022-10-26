import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

interface Props {
  dark: boolean;
  toggleTheme: () => void;
}

const ThemeToggleButton = ({ dark, toggleTheme }: Props) => {
  return (
    <div
      className='p-2 rounded-lg shadow-md bg-gray-100 dark:bg-neutral-700 dark:text-neutral-100'
      onClick={toggleTheme}
    >
      {dark ? <MoonIcon className='h-7' /> : <SunIcon className='h-7' />}
    </div>
  );
};

export default ThemeToggleButton;
