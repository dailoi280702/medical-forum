import { createContext, useContext } from 'react';
import CreateComment, { DComment } from '../CreateComment';
import Image from 'next/image';
import Moment from 'react-moment';
import CommentDetail from './commentDetail';
import { QuestionContext } from '@/pages/question/[id]';
import { useSession } from 'next-auth/react';

type Comment = (DComment & { id: string }) | null;
export const CommentContext = createContext<Comment>(null);

type Props = {
  comment: DComment;
  id: string;
};

function Comment({ id, comment }: Props) {
  const question = useContext(QuestionContext);
  const { data: session } = useSession();
  const isSolution = question?.sovledCommentId === id;
  const isCommentAuthor = comment.authorId === session?.user.uid;
  const isPostAuthor = question?.authorId === session?.user.uid;

  return (
    <CommentContext.Provider value={{ id: id, ...comment }}>
      <div className="flex items center">
        <div className="relative rounded-full w-8 h-8 overflow-hidden mr-4">
          <Image
            className="rounded-full object-cover overflow-hidden"
            src={comment.authorImg}
            sizes="w-8 h-8"
            alt={comment.authorName}
            fill
          />
        </div>
        <p className="font-medium text-sm text-neutral-700 dark:text-neutral-200">
          {comment.authorName}
        </p>
        {comment.createdDate && (
          <Moment
            className="text-sm ml-4 text-neutral-500 dark:text-neutral-400"
            fromNow
          >
            {comment.createdDate.toDate()}
          </Moment>
        )}
        {isSolution && (
          <p className="text-sm ml-4 text-green-500 dark:text-green-200">
            (SOLUTION)
          </p>
        )}
      </div>

      <div className="flex ">
        <div
          className={`mx-4 w-0.5 ${
            isSolution
              ? 'bg-green-500 dark:bg-green-200'
              : 'bg-gray-300 dark:bg-neutral-600'
          }`}
        />
        <div className="ml-4 flex flex-col w-full">
          <CommentDetail
            html={comment.html}
            numberOfDislikes={comment.numberOfDislikes}
            numberOfLikes={comment.numberOfLikes}
            isPostAuthor={isPostAuthor}
            isCommentAuthor={isCommentAuthor}
          />
        </div>
      </div>
    </CommentContext.Provider>
  );
}

export default Comment;
