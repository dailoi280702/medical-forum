import {
  Bars3Icon,
  HomeIcon,
  WindowIcon,
  BookmarkIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import ThemeToggleButton from '../ToogleThemeButton';
import useToggleThemeHook from '../ToogleThemeButton/ToogleThemeHook';
import { useRecoilState } from 'recoil';
import { headerState } from '../../atoms/HeaderAtom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ReactNode } from 'react';

const Header = () => {
  const [open, setOpen] = useRecoilState(headerState);
  const { dark, toggleTheme } = useToggleThemeHook();
  const { data: session } = useSession();
  const router = useRouter();

  type RouteData = {
    route: string;
    text: string;
    isAuthenticationRequired: boolean;
    icons: ReactNode;
  };

  const routes: Array<RouteData> = [
    {
      route: '/',
      text: 'Home',
      isAuthenticationRequired: false,
      icons: <HomeIcon className="header-nav-icon" />,
    },
    {
      route: '/your_questions',
      text: 'Your Quesitons',
      isAuthenticationRequired: true,
      icons: <WindowIcon className="header-nav-icon" />,
    },
    {
      route: '/saved_questions',
      text: 'Saved Quesitons',
      isAuthenticationRequired: true,
      icons: <BookmarkIcon className="header-nav-icon" />,
    },
    {
      route: '/waiting_list',
      text: 'Waiting List',
      isAuthenticationRequired: true,
      icons: <ClockIcon className="header-nav-icon" />,
    },
  ];

  return (
    <nav className="sticky overflow-hidden top-0 w-full min-w-min z-20 bg-white/80 text-neutral-900  p-4 shadow-sm transition-all dark:shadow-md dark:text-neutral-100 dark:bg-neutral-800/80 backdrop-blur-sm">
      <div className="flex flex-col items-start h-full max-w-6xl mx-auto text-md md:flex md:items-center md:flex-row md:space-x-8">
        <div className="flex justify-between items-center w-full md:w-fit">
          <h1
            className="text-3xl text-blue-500 font-bold truncate drop-shadow-lg shadow-black dark:text-blue-400 cursor-pointer"
            onClick={() => router.push('/')}
          >
            Medical Forum
          </h1>
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggleButton dark={dark} toggleTheme={toggleTheme} />
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <Bars3Icon className="h-8" onClick={() => setOpen(!open)} />
            </motion.button>
          </div>
        </div>
        <AnimatePresence>
          <motion.div
            layout="size"
            transition={{ type: 'spring', bounce: 0.4 }}
            className={`space-y-6 my-8 px-4 md:flex items-center md:my-0 md:space-y-0 md:space-x-6 truncate w-full md:w-fit ${
              !open ? 'hidden' : ''
            }`}
          >
            {routes
              .filter((route) => !route.isAuthenticationRequired || session)
              .map((route) => (
                <div
                  key={route.route}
                  className="header-nav-item"
                  onClick={() => router.push(route.route)}
                >
                  <div>{route.icons}</div>
                  <h3
                    className={
                      router.asPath === route.route
                        ? 'underline underline-offset-2 text-blue-500 dark:text-blue-400'
                        : ''
                    }
                  >
                    {route.text}
                  </h3>
                </div>
              ))}
            {session ? (
              <>
                <div className="header-nav-item md:hidden hover:text-red-600 dark:hover:text-red-400">
                  <ArrowRightOnRectangleIcon className="header-nav-icon" />
                  <button onClick={() => signOut()}>
                    <h3 className="flex-1">Sign Out</h3>
                  </button>
                </div>
                <div className="flex items-center pt-5 border border-b-0 border-x-0 border-t-neutral-200 dark:border-t-neutral-700 md:hidden">
                  <div className="relative rounded-full w-10 h-10 overflow-hidden mr-4">
                    <Image
                      className="rounded-full object-cover overflow-hidden"
                      src={session.user.image}
                      alt={session.user.name}
                      fill
                    />
                  </div>
                  <p className="text-sm">{session.user.name}</p>
                </div>
              </>
            ) : (
              <div className="header-nav-item md:hidden hover:text-green-600 dark:hover:text-green-400">
                <ArrowLeftOnRectangleIcon className="header-nav-icon" />
                <button onClick={() => signIn()}>
                  <h3 className="flex-1">Sign In</h3>
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        <span className="flex-1" />
        <div className="hidden md:inline-flex">
          <ThemeToggleButton dark={dark} toggleTheme={toggleTheme} />
        </div>
        {session ? (
          <div className="group flex items-center space-x-4">
            <div className="relative rounded-full w-12 h-12 hidden md:inline-flex">
              <Image
                className="rounded-full object-cover overflow-hidden"
                src={session.user.image}
                alt={session.user.name}
                fill
              />
            </div>
            <button
              onClick={() => signOut()}
              className="hidden group-hover:inline-flex header-nav-item hover:text-red-600 dark:hover:text-red-400"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <motion.button
            className="hidden md:inline-flex hover:text-green-600 dark:hover:text-green-400"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => signIn()}
          >
            Sign In
          </motion.button>
        )}
      </div>
    </nav>
  );
};

export default Header;
