import { QuestionContext } from '@/pages/question/[id]';
import { db } from '../../firebase/clientApp';
import { deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useContext, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { WaitingDetail, WaitingPostsContext } from './index';

const useSetWaiting = () => {
  const { data: session } = useSession();
  const post = useContext(QuestionContext);
  const waitingPosts = useContext(WaitingPostsContext);

  const isWaiting = useMemo(() => {
    if (!post || !waitingPosts || !session) return false;

    return waitingPosts.has(post.id);
  }, [post, waitingPosts, session]);

  const setWatingForPost = () => {
    if (!post || post.sovledCommentId || !waitingPosts || !session) return;

    try {
      const waitingPostRef = doc(
        db,
        'users',
        session.user.uid,
        'waitingPosts',
        post.id
      );

      const waitingUserRef = doc(
        db,
        'question',
        post.id,
        'waitingUsers',
        session.user.uid
      );

      if (isWaiting) {
        deleteDoc(waitingPostRef);
        deleteDoc(waitingUserRef);
        return;
      }

      setDoc(waitingPostRef, {
        postId: post.id,
        userId: session.user.uid,
        setWaitingAt: serverTimestamp(),
      } as WaitingDetail);

      setDoc(waitingUserRef, {
        postId: post.id,
        userId: session.user.uid,
        setWaitingAt: serverTimestamp(),
      } as WaitingDetail);
    } catch (e) {
      console.log(e);
    }
  };

  return { isWaiting, setWatingForPost };
};

export { useSetWaiting };
