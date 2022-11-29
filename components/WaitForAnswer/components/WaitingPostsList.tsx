import Post, { DPost } from '@/components/Post';
import { db } from '../../../firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import PostWrapper from '@/components/Post/PostWrapper';
import { QuestionContext } from '@/pages/question/[id]';
import { useRouter } from 'next/router';
import { WaitingPostsContext } from '..';

const WaitingPostsList = () => {
  const router = useRouter();
  const savedPostIds = useContext(WaitingPostsContext);
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

  return (
    <ul>
      {savedPosts &&
        savedPosts.size > 0 &&
        Array.from(savedPosts).map((value) => (
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
  );
};

export { WaitingPostsList };
