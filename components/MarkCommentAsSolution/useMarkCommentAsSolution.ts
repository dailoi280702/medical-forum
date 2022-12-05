import { QuestionContext } from '@/pages/question/[id]';
import { db } from '../../firebase/clientApp';
import { doc, updateDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useContext, useMemo } from 'react';
import { CommentContext } from '../Comment';

const useMarkCommentAsSolution = () => {
  const comment = useContext(CommentContext);
  const question = useContext(QuestionContext);
  const { data: session } = useSession();

  const isSolution = useMemo(() => {
    if (!session || !comment?.id || !question?.id) return;
    return comment?.id === question?.solvedCommentId;
  }, [comment?.id, question?.id, question?.solvedCommentId, session]);

  const markCommentAsSolution = () => {
    if (!session || !comment || !question) return;

    const questionRef = doc(db, 'question', question.id);

    try {
      updateDoc(questionRef, {
        solvedCommentId: isSolution ? null : comment.id,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return { isSolution, markCommentAsSolution };
};

export { useMarkCommentAsSolution };
