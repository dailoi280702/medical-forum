import { useContext } from 'react';
import { createPortal } from 'react-dom';
import Comment, { CommentContext } from '../Comment';
import { CommentTreeContext } from '../CommentTree';
import { DComment } from '../CreateComment';

type Props = {
  comment: DComment;
  id: string;
};

const CommentNode = ({ id, comment }: Props) => {
  const childComments = useContext(CommentTreeContext);
  const child = Array.from(childComments).filter(
    (value) => value[1].parent === id
  );

  return (
    <CommentContext.Provider value={{ id: id, ...comment }}>
      <div className="mt-8">
        <Comment id={id} comment={comment} />
        <div className="flex">
          <div className="mx-4 w-0.5 bg-neutral-300 dark:bg-neutral-600" />
          <div className="w-full">
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
