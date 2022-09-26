import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';

const Home: NextPage = () => {
  return (
    <div className=''>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <div className='h h-screen bg-gray-50 text-neutral-900 overflow-y-scroll dark:bg-neutral-800 dark:text-neutral-100'>
        <h1 className='text-3xl pt-20'>Hello</h1>
      </div>
    </div>
  );
};

export default Home;
