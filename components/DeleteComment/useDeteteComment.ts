import { QuestionContext } from '@/pages/question/[id]';
import { db } from '../../firebase/clientApp';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { CommentContext } from '../Comment';
import {
  DeleteCommentContext,
  DeleteCommentActionType,
} from './deleteCommentContext';

const useDeleteComment = () => {
  const question = useContext(QuestionContext);
  const comment = useContext(CommentContext);
  const deleteCommentContext = useContext(DeleteCommentContext);

  const setLoading = (loading: boolean) => {
    if (!deleteCommentContext) return;

    deleteCommentContext.action({
      type: DeleteCommentActionType.setLoading,
      payload: { error: loading },
    });
  };

  const deleteComment = async () => {
    if (!question || !comment || !deleteCommentContext) return;

    setLoading(true);

    try {
      await deleteDoc(doc(db, 'question', question.id, 'comments', comment.id));

      await updateDoc(doc(db, 'question', question.id), {
        numberOfComment: question.numberOfComment
          ? question.numberOfComment - 1
          : 0,
      });
    } catch (e) {
      console.log(e);
      deleteCommentContext.action({
        type: DeleteCommentActionType.setError,
        payload: { error: e },
      });
    }

    setLoading(false);
  };
  return deleteComment;
};

export default useDeleteComment;
