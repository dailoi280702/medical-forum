import {
  collection,
  getCountFromServer,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import Post, { DPost } from '../Post';
import { useState, useEffect, useRef } from 'react';
import { db } from '../../firebase/clientApp';
import { useRouter } from 'next/router';
import PostWrapper from '../Post/PostWrapper';
import { QuestionContext } from '@/pages/question/[id]';

const PostList = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Map<string, DPost>>(new Map([]));
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

      onSnapshot(
        query(
          collection(db, 'question'),
          orderBy('timeStamp', 'desc'),
          limit(page * PAGEPERLOAD)
        ),
        (snapshot) => {
          setPosts(
            new Map(
              snapshot.docs.map((doc) => [
                doc.id,
                {
                  ...(doc.data() as DPost),
                },
              ])
            )
          );
          setLoading(false);
        }
      );
    };

    getData();
  }, [page]);

  const openPostDetail = (id: string) => {
    return () => {
      router.push(`/question/${id}`);
    };
  };

  return (
    <>
      <ul ref={listRef}>
        {posts.size > 0 &&
          Array.from(posts).map((value) => (
            <PostWrapper
              key={value[0]}
              darkerBorder={true}
              onClick={openPostDetail(value[0])}
            >
              <QuestionContext.Provider value={{ id: value[0], ...value[1] }}>
                <Post
                  id={value[0]}
                  post={value[1]}
                  onclick={openPostDetail(value[0])}
                />
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

export default PostList;
