import { QuestionContext } from '@/pages/question/[id]';
import { db } from '../../../firebase/clientApp';
import { doc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { useContext, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { WaitingDetail, WaitingDetailsContext } from '..';

const useSetWaiting = () => {
  const { data: session } = useSession();
  const post = useContext(QuestionContext);
  const waitingDetails = useContext(WaitingDetailsContext);

  const isWaiting = useMemo(() => {
    if (!post || !waitingDetails || !session) return false;

    return waitingDetails.has(post.id);
  }, [post, waitingDetails, session]);

  const setWatingForPost = async () => {
    if (!post || post.solvedCommentId || !waitingDetails || !session) return;

    try {
      const waitingPostRef = doc(
        db,
        'users',
        session.user.uid,
        'waitingDetails',
        post.id
      );

      const waitingUserRef = doc(
        db,
        'question',
        post.id,
        'waitingDetails',
        session.user.uid
      );

      const batch = writeBatch(db);

      if (isWaiting) {
        batch.delete(waitingPostRef);
        batch.delete(waitingUserRef);
      } else {
        batch.set(waitingPostRef, {
          postId: post.id,
          userId: session.user.uid,
          setWaitingAt: serverTimestamp(),
        } as WaitingDetail);
        batch.set(waitingUserRef, {
          postId: post.id,
          userId: session.user.uid,
          setWaitingAt: serverTimestamp(),
        } as WaitingDetail);
      }

      const currentWaiting = post.numberOfWaitings ?? 0;
      batch.update(doc(db, 'question', post.id), {
        numberOfWaitings: isWaiting ? currentWaiting - 1 : currentWaiting + 1,
      });

      batch.commit().catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };

  return { isWaiting, setWatingForPost };
};

export { useSetWaiting };
