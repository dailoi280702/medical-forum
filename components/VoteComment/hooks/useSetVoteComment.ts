import { CommentContext } from '@/components/Comment';
import { db } from '@/firebase/clientApp';
import { CollectionEnum } from '@/firebase/enum';
import { QuestionContext } from '@/pages/question/[id]';
import { doc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useContext, useMemo } from 'react';
import { VoteDetail } from '../type';
import { VotedCommentsContext } from '../VotedCommentsContext';

type Vote = 'like' | 'disLike';

export const useSetVoteComment = () => {
  const { data: session } = useSession();
  const votedComments = useContext(VotedCommentsContext);
  const question = useContext(QuestionContext);
  const comment = useContext(CommentContext);

  const isLiked = useMemo(() => {
    if (
      !session ||
      !comment ||
      votedComments.size === 0 ||
      !votedComments.has(comment.id)
    )
      return false;

    return votedComments.get(comment.id)?.isLiked;
  }, [comment, session, votedComments]);

  const isDisliked = useMemo(() => {
    if (
      !session ||
      !comment ||
      votedComments.size === 0 ||
      !votedComments.has(comment.id)
    )
      return false;

    return !votedComments.get(comment.id)?.isLiked;
  }, [comment, session, votedComments]);

  const voteComment = function (vote: Vote) {
    if (!session || !comment || !question) return;

    const commentRef = doc(
      db,
      CollectionEnum.QUESTIONS,
      question.id,
      CollectionEnum.COMMENTS,
      comment.id
    );
    const votedCommentRef = doc(
      db,
      CollectionEnum.USERS,
      session.user.uid,
      CollectionEnum.VOTEDCOMMENTS,
      comment.id
    );
    const batch = writeBatch(db);

    if ((vote === 'like' && isLiked) || (vote === 'disLike' && isDisliked)) {
      batch.delete(votedCommentRef);

      batch.update(
        commentRef,
        vote === 'like'
          ? { numberOfLikes: comment.numberOfLikes - 1 }
          : { numberOfDislikes: comment.numberOfDislikes - 1 }
      );
    } else {
      if (!isLiked && !isDisliked) {
        batch.update(
          commentRef,
          vote === 'like'
            ? { numberOfLikes: comment.numberOfLikes + 1 }
            : { numberOfDislikes: comment.numberOfDislikes + 1 }
        );
      } else {
        batch.update(commentRef, {
          numberOfLikes: comment.numberOfLikes + (vote === 'like' ? 1 : -1),
          numberOfDislikes:
            comment.numberOfDislikes - (vote === 'like' ? 1 : -1),
        });
      }

      batch.set(votedCommentRef, {
        voteAt: serverTimestamp(),
        isLiked: vote === 'like',
      } as VoteDetail);
    }
    batch.commit().catch((e) => console.log(e));
  };

  return { isLiked, isDisliked, voteComment };
};
