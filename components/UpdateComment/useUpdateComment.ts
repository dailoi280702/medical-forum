import { QuestionContext } from '@/pages/question/[id]';
import { db } from '../../firebase/clientApp';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { CommentContext } from '../Comment';
import { UpdateCommentContext } from './updateCommentContext';

const useUpdateComment = () => {
  const comment = useContext(CommentContext);
  const question = useContext(QuestionContext);
  const { state, action } = useContext(UpdateCommentContext);

  const setLoading = (loading: boolean) => {
    if (!action) return;

    action({
      type: 'setLoading',
      payload: { loading: loading },
    });
  };

  const setEditMode = (setEditing: boolean) => {
    if (!action) return;

    action({
      type: 'setEditMode',
      payload: { editing: setEditing },
    });
  };

  const updateComment = async () => {
    if (!question || !comment) return;

    setLoading(true);
    try {
      console.log(state?.comment);
      await updateDoc(
        doc(db, 'question', question.id, 'comments', comment.id),
        { ...comment, editedDate: serverTimestamp(), html: state?.comment }
      );
    } catch (e) {
      action?.({ type: 'setError', payload: { error: e } });
    }
    setEditMode(false);
    setLoading(false);
  };

  return updateComment;
};

export default useUpdateComment;
