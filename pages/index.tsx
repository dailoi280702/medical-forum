import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import PageWrapper from '@/components/PageWrapper';
import CreatePostField from '@/components/CreatePostField';

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
          // <h1 className='text-3xl pt-20'>Hello</h1>
          <h1 className='text-3xl pt-20'>Hello</h1>
          <h1 className='text-2xl pt-8'>
            Hello Lorem ipsum dolor sit amet, officia excepteur ex fugiat
            reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit
            ex esse exercitation amet. Nisi anim cupidatat excepteur officia.
            Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate
            voluptate dolor minim nulla est proident. Nostrud officia pariatur
            ut officia. Sit irure elit esse ea nulla sunt ex occaecat
            reprehenderit commodo officia dolor Lorem duis laboris cupidatat
            officia voluptate. Culpa proident adipisicing id nulla nisi laboris
            ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo
            ex non excepteur duis sunt velit enim. Voluptate laboris sint
            cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
          </h1>
        </>
      </PageWrapper>
    </div>
  );
};

export default Home;
