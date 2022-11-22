import { QuestionContext } from '@/pages/question/[id]';
import { db } from '../../firebase/clientApp';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useState, useEffect, useContext } from 'react';
import CommentNode from '../CommentNode';
import { DComment } from '../CreateComment';
import { createContext } from 'react';

export const CommentTreeContext = createContext<Map<string, DComment>>(
  new Map([])
);

const CommentTree = () => {
  const [comments, setComments] = useState<Map<string, DComment>>(new Map([]));
  const question = useContext(QuestionContext);

  useEffect(() => {
    if (!question) return;

    onSnapshot(
      query(
        collection(db, 'question', question.id, 'comments'),
        orderBy('createdDate', 'asc')
      ),
      (snapshot) => {
        setComments(
          new Map(
            snapshot.docs.map((doc) => [
              doc.id,
              {
                ...(doc.data() as DComment),
              },
            ])
          )
        );
      }
    );
  }, [question]);

  return (
    <CommentTreeContext.Provider value={comments}>
      <ul>
        {comments.size > 0 &&
          Array.from(comments)
            .filter((value) => !value[1].parent)
            .map((value) => (
              <CommentNode key={value[0]} id={value[0]} comment={value[1]} />
            ))}
      </ul>
    </CommentTreeContext.Provider>
  );
};

export default CommentTree;
