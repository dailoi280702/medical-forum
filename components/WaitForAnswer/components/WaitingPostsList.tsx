import { DPost } from '@/components/Post';
import { db } from '../../../firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { WaitingDetailsContext } from '..';
import DefaultPostsList from '@/components/DefaultPostsList';

const WaitingPostsList = () => {
  const savedPostIds = useContext(WaitingDetailsContext);
  const [savedPosts, setWaitingPosts] = useState<Map<string, DPost>>();

  useEffect(() => {
    if (savedPostIds.size === 0) return;

    const fetchWaitingPost = async () => {
      const updatedWaitingPosts = new Map();

      for (const id of Array.from(savedPostIds.keys())) {
        const post = (await getDoc(doc(db, 'question', id))).data() as DPost;
        updatedWaitingPosts.set(id, post);
      }

      setWaitingPosts(updatedWaitingPosts);
    };

    fetchWaitingPost();
  }, [savedPostIds]);

  return <>{savedPosts && <DefaultPostsList posts={savedPosts} />}</>;
};

export { WaitingPostsList };
