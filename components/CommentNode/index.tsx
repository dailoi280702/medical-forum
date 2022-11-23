import { useContext, useState } from 'react';
import Comment, { CommentContext } from '../Comment';
import { CommentTreeContext } from '../CommentTree';
import CreateComment, { DComment } from '../CreateComment';

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
      <div className='mt-8'>
        <Comment
          id={id}
          comment={comment}
          onReply={() => setIsReplying((isReplying) => !isReplying)}
        />
        <div className='flex'>
          <div className='mx-4 w-0.5 bg-neutral-300 dark:bg-neutral-600' />
          <div className='w-full'>
            {isReplying && (
              <CreateComment
                className='px-4 py-2'
                actionButtonText='Reply'
                setVisibility={(visibility) => setIsReplying(visibility)}
              />
            )}
            {child.length > 0 &&
              child.map((value) => (
                <CommentNode key={value[0]} id={value[0]} comment={value[1]} />
              ))}
          </div>
        </div>
      </div>
    </CommentContext.Provider>
  );
};

export default CommentNode;
