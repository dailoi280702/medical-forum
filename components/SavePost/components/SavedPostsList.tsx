import { DPost } from '@/components/Post';
import { db } from '../../../firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import SavedPostsContext from '../savedPostsContext';
import DefaultPostsList from '@/components/DefaultPostsList';

const SavedPostsList = () => {
  const savedPostIds = useContext(SavedPostsContext);
  const [savedPosts, setSavedPost] = useState<Map<string, DPost>>();

  useEffect(() => {
    if (savedPostIds.size === 0) return;

    const fetchSavedPost = async () => {
      const updatedSavedPosts = new Map();

      for (const id of Array.from(savedPostIds.keys())) {
        const post = (await getDoc(doc(db, 'question', id))).data() as DPost;
        updatedSavedPosts.set(id, post);
      }

      setSavedPost(updatedSavedPosts);
    };

    fetchSavedPost();
  }, [savedPostIds]);

  return <>{savedPosts && <DefaultPostsList posts={savedPosts} />}</>;
};

export default SavedPostsList;
