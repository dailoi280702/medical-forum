import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { extractContent } from '../CreatePostField';
import TextEditor from '../TextEditor';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  comment: string;
  actionButtonText?: string;
  cancleButtonText?: string;
  setComment: Dispatch<SetStateAction<string>>;
  onCancle: () => any;
  onDone: () => any;
};

const CreateCommentView = ({
  comment,
  actionButtonText,
  cancleButtonText,
  setComment,
  onCancle,
  onDone,
}: Props) => {
  const [focus, setFocus] = useState(false);
  const buttonDisabled = useMemo(
    () => extractContent(comment) === '',
    [comment]
  );

  return (
    <div className="flex flex-col border border-neutral-400/40 dark:border-neutral-500/40 rounded-md">
      <TextEditor
        className="ql-transparent ql-noborder"
        placeHolder="Comment"
        value={comment}
        setValue={setComment}
        onFocus={() => setFocus(true)}
        onFocusOut={() => setFocus(false)}
      />
      <AnimatePresence>
        {focus && (
          <motion.div
            className="self-end mt-4 flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <button
              className="red-text-button my-2 mr-2"
              disabled={extractContent(comment) === ''}
              onClick={onCancle}
            >
              {cancleButtonText ?? 'Clear'}
            </button>
            <button
              className="blue-text-button my-2 mr-2"
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
