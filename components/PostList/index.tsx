import {
  collection,
  getCountFromServer,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { DPost } from '../Post';
import { useState, useEffect, useRef } from 'react';
import { db } from '../../firebase/clientApp';
import DefaultPostsList from '../DefaultPostsList';

const PostList = () => {
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

  return <DefaultPostsList posts={posts} listRef={listRef} loading={loading} />;
};

export default PostList;
