import { useContext, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { QuestionContext } from '@/pages/question/[id]';
import { db } from '../../firebase/clientApp';
import { DComment } from '.';
import { CommentContext } from '../Comment';
import { constSelector } from 'recoil';

const CreateCommentHook = () => {
  const { data: session } = useSession();
  const [comment, setComment] = useState('');
  const [modalVisibility, setModalVisibility] = useState(false);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const question = useContext(QuestionContext);
  const parentComment = useContext(CommentContext);

  const postComment = async () => {
    setLoading(true);
    try {
      if (!question || !session) {
        setLoading(false);
        return;
      }

      await addDoc(collection(db, 'question', question.id, 'comments'), {
        ...({
          authorId: session.user.uid,
          authorImg: session.user.image,
          authorName: session.user.name,
          html: comment.trim(),
          createdDate: serverTimestamp(),
          deep: 1,
          numberOfLikes: 0,
          numberOfDislikes: 0,
          parent: parentComment ? parentComment.id : null,
        } as DComment),
      });

      await updateDoc(doc(db, 'question', question.id), {
        numberOfComment: question.numberOfComment
          ? question.numberOfComment + 1
          : 1,
      });

      setComment('');
      setModalVisibility(true);
    } catch (e) {
      setError(e);
      setModalVisibility(true);
    }
    setLoading(false);
  };

  const cancel = () => {
    setComment('');
  };

  const clearError = () => {
    setError(null);
  };

  return {
    values: {
      comment,
      modalVisibility,
    },
    events: {
      setComment,
      setModalVisibility,
      cancel,
      postComment,
      clearError,
    },
    state: {
      error,
      loading,
    },
  };
};

export default CreateCommentHook;
