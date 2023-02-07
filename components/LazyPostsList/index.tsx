import { db } from '@/firebase/clientApp';
import { collection, getCountFromServer } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import DefaultPostsList from '../DefaultPostsList';
import { DPost } from '../Post';

type Props = {
  posts: Map<string, DPost>;
  fetchPosts: (limit: number) => void;
};

const LazyPostsList = ({ posts, fetchPosts }: Props) => {
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
      if (
        numberOfPost.data().count <= PAGEPERLOAD * (page - 1) ||
        numberOfPost.data().count == 0
      ) {
        setLoading(false);
        return;
      }

      fetchPosts(page * PAGEPERLOAD);
      setLoading(false);
    };

    getData();
  }, [fetchPosts, page]);

  return <DefaultPostsList posts={posts} listRef={listRef} loading={loading} />;
};

export default LazyPostsList;
