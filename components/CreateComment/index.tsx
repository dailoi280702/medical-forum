import { signIn, useSession } from 'next-auth/react';
import CreateCommentView from './CreateCommentView';
import useCreateComment from './CreateCommentHook';
import { Timestamp } from 'firebase/firestore';

export type DComment = {
  authorId: string;
  authorName: string;
  authorImg: string;
  html: string;
  createdDate: Timestamp;
  editedDate?: Timestamp;
  deep: number;
  parent?: string;
  numberOfLikes: number;
  numberOfDislikes: number;
};

const CreateComment = () => {
  const { data: session } = useSession();
  const { events, values, state } = useCreateComment();

  return (
    <div>
      {session ? (
        <CreateCommentView
          comment={values.comment}
          setComment={events.setComment}
          onCancle={events.cancel}
          onDone={events.postComment}
        />
      ) : (
        <p className="w-full text-center text-xl">
          <button
            className="font-semibold opacity-80 hover:opacity-100 hover:underline hover:scale-105 text-blue-600 dark:text-blue-400 transition-transform"
            onClick={() => signIn()}
          >
            Sign In
          </button>{' '}
          and leave a comment
        </p>
      )}
    </div>
  );
};

export default CreateComment;
