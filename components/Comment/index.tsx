import { createContext, useContext, useState } from 'react';
import CreateComment, { DComment } from '../CreateComment';
import Image from 'next/image';
import Moment from 'react-moment';
import CommentDetail from './commentDetail';
import { QuestionContext } from '@/pages/question/[id]';
import { useSession } from 'next-auth/react';
import UpdateCommentWrapper, { UpdateCommentProvider } from '../UpdateComment';

type Comment = (DComment & { id: string }) | null;
export const CommentContext = createContext<Comment>(null);

type Props = {
  comment: DComment;
  id: string;
  onReply?: () => any;
};

function Comment({ id, comment, onReply }: Props) {
  const question = useContext(QuestionContext);
  const { data: session } = useSession();
  const isSolution = question?.sovledCommentId === id;
  const isCommentAuthor = comment.authorId === session?.user.uid;
  const isPostAuthor = question?.authorId === session?.user.uid;

  return (
    <CommentContext.Provider value={{ id: id, ...comment }}>
      <div className='mt-2 flex items-center text-sm space-x-2 text-neutral-500 dark:text-neutral-400'>
        <div className='relative rounded-full w-8 h-8 overflow-hidden mr-4'>
          <Image
            className='rounded-full object-cover'
            src={comment.authorImg}
            sizes='w-8 h-8'
            alt={comment.authorName}
            fill
          />
        </div>
        <p className='font-medium text-sm text-neutral-700 dark:text-neutral-200'>
          {comment.authorName}
        </p>
        {comment.createdDate && (
          <Moment fromNow>{comment.createdDate.toDate()}</Moment>
        )}
        {comment.editedDate && <p>[edited]</p>}
        {isSolution && (
          <p className='text-sm ml-4 text-green-500 dark:text-green-200'>
            (SOLUTION)
          </p>
        )}
      </div>
      <div className='relative max-w-full'>
        <div className='ml-12 flex flex-col'>
          <UpdateCommentProvider>
            <UpdateCommentWrapper>
              <CommentDetail
                html={comment.html}
                numberOfDislikes={comment.numberOfDislikes}
                numberOfLikes={comment.numberOfLikes}
                isPostAuthor={isPostAuthor}
                isCommentAuthor={isCommentAuthor}
                onComment={onReply}
              />
            </UpdateCommentWrapper>
          </UpdateCommentProvider>
        </div>
        <div className='w-8 flex justify-center absolute left-0 top-0 bottom-0'>
          <div
            className={`w-0.5 ${
              isSolution
                ? 'bg-green-500 dark:bg-green-200'
                : 'bg-gray-300 dark:bg-neutral-600'
            }`}
          />
        </div>
      </div>
    </CommentContext.Provider>
  );
}

export default Comment;
