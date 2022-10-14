import {
  Bars3Icon,
  HomeIcon,
  WindowIcon,
  BookmarkIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';
import ThemeToggleButton from '../ToogleThemeButton';
import useToggleThemeHook from '../ToogleThemeButton/ToogleThemeHook';
import { useRecoilState } from 'recoil';
import { headerState } from '../../atoms/HeaderAtom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';

const Header = () => {
  const [open, setOpen] = useRecoilState(headerState);
  const { dark, toggleTheme } = useToggleThemeHook();
  const { data: session } = useSession();

  return (
    <nav className='sticky top-0 w-full min-w-min z-20  bg-white text-neutral-900  p-4 shadow-sm transition-all dark:shadow-md dark:text-neutral-100 dark:bg-neutral-800'>
      <div className='flex flex-col items-start h-full max-w-6xl mx-auto text-md md:flex md:items-center md:flex-row md:space-x-8'>
        <div className='flex justify-between items-center w-full md:w-fit'>
          <h1 className='text-3xl text-blue-500 font-bold truncate drop-shadow-lg shadow-black dark:text-blue-400'>
            Medical Forum
          </h1>
          <div className='flex items-center space-x-4 md:hidden'>
            <ThemeToggleButton dark={dark} toggleTheme={toggleTheme} />
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <Bars3Icon className='h-8' onClick={() => setOpen(!open)} />
            </motion.button>
          </div>
        </div>
        <AnimatePresence>
          <motion.div
            layout='size'
            transition={{ type: 'spring', bounce: 0.4 }}
            className={`space-y-6 my-8 px-4 md:flex items-center md:my-0 md:space-y-0 md:space-x-6 truncate w-full md:w-fit ${
              !open ? 'hidden' : ''
            }`}
          >
            <div className='header-nav-item'>
              <HomeIcon className='header-nav-icon' />
              <h3>Home</h3>
            </div>
            <div className='header-nav-item'>
              <WindowIcon className='header-nav-icon' />
              <h3>Your Posts</h3>
            </div>
            <div className='header-nav-item'>
              <BookmarkIcon className='header-nav-icon' />
              <h3 className='flex-1'>Saved Posts</h3>
            </div>
            <div className='header-nav-item md:hidden hover:text-red-600 dark:hover:text-red-400'>
              <ArrowLeftOnRectangleIcon className='header-nav-icon' />
              <h3 className='flex-1'>Sign Out</h3>
            </div>
            <div className='flex items-center pt-5 border border-b-0 border-x-0 border-t-neutral-200 dark:border-t-neutral-700 md:hidden'>
              <div className='rounded-full w-10 h-10 overflow-hidden mr-4'>
                <img
                  className='overflow-hidden object-contain'
                  src='https://pbs.twimg.com/media/FDdpjdGXEAA98K5?format=jpg&name=900x900'
                  alt=''
                />
              </div>
              <p className='text-sm'>Captain Taimo</p>
            </div>
          </motion.div>
        </AnimatePresence>
        <span className='flex-1' />
        <div className='hidden md:inline-flex'>
          <ThemeToggleButton dark={dark} toggleTheme={toggleTheme} />
        </div>
        {session ? (
          <div className='group flex items-center space-x-4'>
            <div className='rounded-full w-12 h-12 overflow-hidden hidden md:inline-flex'>
              <img
                className='overflow-hidden object-contain'
                src='https://pbs.twimg.com/media/FDdpjdGXEAA98K5?format=jpg&name=900x900'
                alt=''
              />
            </div>
            <p className='hidden group-hover:inline-flex header-nav-item hover:text-red-600 dark:hover:text-red-400'>
              Sign Out
            </p>
          </div>
        ) : (
          <p>Sign In</p>
        )}
      </div>
    </nav>
  );
};

export default Header;
