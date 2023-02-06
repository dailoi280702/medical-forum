import Post, { DPost } from '@/components/Post';
import { db } from '../../../firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import SavedPostsContext from '../savedPostsContext';
import PostWrapper from '@/components/Post/PostWrapper';
import { QuestionContext } from '@/pages/question/[id]';
import { useRouter } from 'next/router';

const SavedPostsList = () => {
  const router = useRouter();
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

  const openPostDetail = (id: string) => {
    return () => {
      router.push(`/question/${id}`);
    };
  };

  return (
    <ul>
      {savedPosts &&
        savedPosts.size > 0 &&
        Array.from(savedPosts).map((value) => (
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
  );
};

export default SavedPostsList;
