import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import PageWrapper from '@/components/PageWrapper';
import CreatePostField from '@/components/CreatePostField';
import PostList from 'components/PostList';

const Home: NextPage = () => {
  return (
    <div className='h-screen bg-gray-50 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <PageWrapper>
        <>
          <CreatePostField />
          <div className='mt-20'>
            <PostList />
          </div>
        </>
      </PageWrapper>
    </div>
  );
};

export default Home;
