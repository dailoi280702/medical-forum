import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import PageWrapper from '@/components/PageWrapper';
import LazyPostsList from '@/components/LazyPostsList';
import { useState } from 'react';
import { DPost } from '@/components/Post';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  limit,
  where,
} from 'firebase/firestore';
import { db } from '@/firebase/clientApp';
import { useSession } from 'next-auth/react';

const YourQuestions: NextPage = () => {
  const [posts, setPosts] = useState<Map<string, DPost>>(new Map());
  const { data: session } = useSession();

  const fetchPosts = (numberOfPosts: number) => {
    if (!session?.user.uid) return;
    console.log('fuck');

    onSnapshot(
      query(
        collection(db, 'question'),
        orderBy('timeStamp', 'desc'),
        where('authorId', '==', session?.user.uid),
        limit(numberOfPosts)
      ),
      (snapshot) => {
        setPosts(
          new Map(
            snapshot.docs
              .filter((doc) => doc.data())
              .map((doc) => [
                doc.id,
                {
                  ...(doc.data() as DPost),
                },
              ])
          )
        );
      }
    );
  };

  return (
    <>
      <div className="h-screen w-full bg-neutral-100 dark:bg-neutral-900 dark:border- top-0 z-[-1] absolute" />
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <PageWrapper>
        <LazyPostsList posts={posts} fetchPosts={fetchPosts} />
      </PageWrapper>
    </>
  );
};

export default YourQuestions;
