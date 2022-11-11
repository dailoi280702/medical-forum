import { DPost } from '@/components/Post';
import { db } from '../../firebase/clientApp';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import type { GetStaticProps } from 'next';
import Header from '@/components/Header';
import PageWrapper from '@/components/PageWrapper';
import Post from '@/components/Post';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PostPage = (props: { post: DPost }) => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(props.post);

  useEffect(
    () =>
      onSnapshot(doc(db, 'question', id as string), (snapshot) => {
        setPost(snapshot.data() as DPost);
      }),
    [id, post]
  );

  return (
    <>
      <div className='h-screen w-full bg-neutral-100 dark:bg-neutral-900 dark:border- top-0 z-[-1] absolute' />
      <Header />
      <PageWrapper>
        <Post id={id as string} post={post} />
      </PageWrapper>
    </>
  );
};

export const getStaticPaths = async () => {
  const snapshot = await getDocs(collection(db, 'question'));
  const paths = snapshot.docs.map((doc) => ({
    params: { id: doc.id },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ post: DPost }> = async ({
  params,
}) => {
  const docRef = doc(db, 'question', params!.id as string);
  const snapshot = await getDoc(docRef);
  const post = snapshot.data() as DPost;
  post.timeStamp = null;

  return {
    props: { post: post },
  };
};

export default PostPage;
