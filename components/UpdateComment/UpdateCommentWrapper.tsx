import { ReactNode, useContext, useEffect, useState } from 'react';
import { UpdateCommentContext } from './updateCommentContext';
import { motion, AnimatePresence } from 'framer-motion';
import CreateCommentView from '../CreateComment/CreateCommentView';
import useUpdateComment from './useUpdateComment';
import { CommentContext } from '../Comment';

type Props = {
  children: ReactNode;
};

const UpdateCommentWrapper = ({ children: child }: Props) => {
  const { state, action } = useContext(UpdateCommentContext);
  const updateCommnet = useUpdateComment();

  const onCancle = () => {
    if (!action) return;

    action({ type: 'reset', payload: {} });
  };
  const [html, setHtml] = useState<string>(state?.comment ?? '');

  useEffect(() => {
    if (!action) return;

    action({ type: 'updateComment', payload: { comment: html } });
  }, [html, action]);

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={String(state?.editing)}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 100, x: 0, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{
          duration: 0.2,
          type: 'spring',
          velocity: 10,
        }}
      >
        {state?.editing ? (
          <CreateCommentView
            comment={state.comment ?? ''}
            setComment={setHtml}
            onCancle={onCancle}
            onDone={updateCommnet}
            actionButtonText='Update'
            cancleButtonText='Cancle'
          />
        ) : (
          <>{child}</>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default UpdateCommentWrapper;
