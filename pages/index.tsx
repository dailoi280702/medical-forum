import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import PageWrapper from '@/components/PageWrapper';
import CreatePostField from '@/components/CreatePostField';
import PostList from 'components/PostList';

const Home: NextPage = () => {
  return (
    <>
      <div className="h-screen w-full bg-neutral-100 dark:bg-neutral-900 dark:border- top-0 z-[-1] absolute" />
      <Head>
        <title>Medical Forum</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Header />
      <PageWrapper>
        <>
          <CreatePostField />
          <div className="mt-8">
            <PostList />
          </div>
        </>
      </PageWrapper>
    </>
  );
};

export default Home;
