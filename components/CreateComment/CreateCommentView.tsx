import { Dispatch, SetStateAction, useState } from 'react';
import { extractContent } from '../CreatePostField';
import TextEditor from '../TextEditor';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  comment: string;
  actionButtonText?: string;
  setComment: Dispatch<SetStateAction<string>>;
  onCancle: () => any;
  onDone: () => any;
};

const CreateCommentView = ({
  comment,
  actionButtonText,
  setComment,
  onCancle,
  onDone,
}: Props) => {
  const [focus, setFocus] = useState(false);

  return (
    <div className='flex flex-col'>
      <TextEditor
        className='ql-transparent'
        placeHolder='Comment'
        value={comment}
        setValue={setComment}
        onFocus={() => setFocus(true)}
        onFocusOut={() => setFocus(false)}
      />
      <AnimatePresence>
        {focus && (
          <motion.div
            className='self-end mt-4 flex items-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className='red-text-button mr-4' onClick={onCancle}>
              Clear
            </button>
            <button
              className='blue-outline-button'
              disabled={extractContent(comment) === ''}
              onClick={onDone}
            >
              {actionButtonText ?? 'Comment'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateCommentView;
