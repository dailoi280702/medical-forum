import { db } from '@/firebase/clientApp';
import { QuestionContext } from '@/pages/question/[id]';
import { collection, getCountFromServer } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Post, { DPost } from '../Post';
import PostWrapper from '../Post/PostWrapper';

type Props = {
  posts: Map<string, DPost>;
  fetchPosts: (limit: number) => void;
};

const LazyPostsList = ({ posts, fetchPosts }: Props) => {
  const router = useRouter();
  const listRef = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    var lastScrollTop: number;

    const trackScrolling = () => {
      var st = window.pageYOffset || document.documentElement.scrollTop;

      if (st > lastScrollTop) {
        const list = listRef.current;
        if (!list || loading) return;

        if (isBottom(list)) {
          setPage((page) => (loading ? page : page + 1));
        }
      }

      lastScrollTop = st <= 0 ? 0 : st;
    };

    document.addEventListener('scroll', trackScrolling);

    return () => {
      document.removeEventListener('scroll', trackScrolling);
    };
  }, [loading]);

  const isBottom = (el: HTMLUListElement) => {
    return (
      el.getBoundingClientRect().bottom <= window.innerHeight &&
      window.scrollY > 0
    );
  };

  useEffect(() => {
    const getData = async () => {
      const PAGEPERLOAD = 5;
      const numberOfPost = await getCountFromServer(collection(db, 'question'));
      if (numberOfPost.data().count <= PAGEPERLOAD * (page - 1)) return;

      fetchPosts(page * PAGEPERLOAD);
      setLoading(false);
    };

    getData();
  }, [fetchPosts, page]);

  return (
    <>
      <ul ref={listRef}>
        {posts.size > 0 &&
          Array.from(posts).map((value) => (
            <PostWrapper
              key={value[0]}
              darkerBorder={true}
              onClick={() => {
                router.push(`/question/${value[0]}`);
              }}
            >
              <QuestionContext.Provider value={{ id: value[0], ...value[1] }}>
                <Post id={value[0]} post={value[1]} />
              </QuestionContext.Provider>
            </PostWrapper>
          ))}
      </ul>
      {loading && (
        <div className="w-full text-center text-neutral-300 dark:text-neutral-700 mt-8">
          loading ... please wait
        </div>
      )}
    </>
  );
};

export default LazyPostsList;
