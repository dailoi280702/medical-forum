import { QuestionContext } from '@/pages/question/[id]';
import { db } from '../../../firebase/clientApp';
import { arrayRemove, arrayUnion, doc, writeBatch } from 'firebase/firestore';
import { useContext, useMemo } from 'react';
import { useSession } from 'next-auth/react';

const useSetWaiting = () => {
  const { data: session } = useSession();
  const post = useContext(QuestionContext);

  const isWaiting = useMemo(() => {
    if (!session || !post || !post.waitingUsers) return false;

    return post.waitingUsers.includes(session.user.uid);
  }, [post, session]);

  const setWatingForPost = async () => {
    if (!session || !post || post.solvedCommentId) return;

    try {
      const postRef = doc(db, 'question', post.id);

      const batch = writeBatch(db);

      if (isWaiting) {
        batch.update(postRef, { waitingUsers: arrayRemove(session.user.uid) });
      } else {
        batch.update(postRef, { waitingUsers: arrayUnion(session.user.uid) });
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
