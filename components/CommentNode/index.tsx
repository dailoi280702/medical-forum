import { useContext, useState } from 'react';
import Comment, { CommentContext } from '../Comment';
import { CommentTreeContext } from '../CommentTree';
import CreateComment, { DComment } from '../CreateComment';
import {
  DeleteCommentProvider,
  ConfirmDeleteCommentModal,
} from '../DeleteComment/';

type Props = {
  comment: DComment;
  id: string;
};

const CommentNode = ({ id, comment }: Props) => {
  const [isReplying, setIsReplying] = useState(false);
  const childComments = useContext(CommentTreeContext);
  const child = Array.from(childComments).filter(
    (value) => value[1].parent === id
  );

  return (
    <CommentContext.Provider value={{ id: id, ...comment }}>
      <DeleteCommentProvider>
        <Comment
          id={id}
          comment={comment}
          onReply={() => setIsReplying((isReplying) => !isReplying)}
        />
        <div className='relative flex'>
          <div className='ml-8'>
            {isReplying && (
              <CreateComment
                className='pl-4 pt-2 block'
                actionButtonText='Reply'
                setVisibility={(visibility) => setIsReplying(visibility)}
              />
            )}
            {child.length > 0 &&
              child.map((value) => (
                <CommentNode key={value[0]} id={value[0]} comment={value[1]} />
              ))}
          </div>
          <div className='w-8 flex justify-center absolute left-0 top-0 bottom-0'>
            <div className='w-0.5 bg-neutral-300 dark:bg-neutral-600' />
          </div>
        </div>
        <ConfirmDeleteCommentModal />
      </DeleteCommentProvider>
    </CommentContext.Provider>
  );
};

export default CommentNode;
