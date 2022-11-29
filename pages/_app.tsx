import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import SavePostsProvider from '@/components/SavePost';
import { WaitingPostsProvider } from '@/components/WaitForAnswer';

function MyApp({ Component, pageProps }: AppProps) {
  const getTheme = () => {
    const t = localStorage.getItem('theme');
    if (!t) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches)
        return 'dark';
      return 'light';
    }
    return t;
  };

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <RecoilRoot>
      <SessionProvider>
        <SavePostsProvider>
          <WaitingPostsProvider>
            <Component {...pageProps} />
          </WaitingPostsProvider>
        </SavePostsProvider>
      </SessionProvider>
    </RecoilRoot>
  );
}

export default MyApp;
