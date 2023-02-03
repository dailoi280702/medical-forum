import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import PageWrapper from '@/components/PageWrapper';
import SavedPostsList from '@/components/SavePost/components/SavedPostsList';

const Home: NextPage = () => {
  return (
    <>
      <div className="h-screen w-full bg-neutral-100 dark:bg-neutral-900 dark:border- top-0 z-[-1] absolute" />
      <Head>
        <title>Saved question</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Header />
      <PageWrapper>
        <SavedPostsList />
      </PageWrapper>
    </>
  );
};

export default Home;
