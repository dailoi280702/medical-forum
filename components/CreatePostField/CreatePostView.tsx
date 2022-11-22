import { AnimatePresence, motion } from 'framer-motion';
import { ChangeEvent, ReactNode } from 'react';
import { extractContent } from '.';
import TextEditor from '../TextEditor';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  title: string;
  question: string;
  titlePlacehoder?: string;
  questionPlacehoder?: string;
  postVisibility: boolean;
  setTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  setQuestion: Dispatch<SetStateAction<string>>;
  onDone: () => any;
  onCancle: () => any;
  children: ReactNode;
  canPerformAction?: boolean;
  actionLable?: string;
};

const CreatePostView = (props: Props) => {
  const {
    question,
    title,
    questionPlacehoder,
    titlePlacehoder,
    postVisibility,
    setQuestion,
    setTitle,
    onDone,
    onCancle,
    children,
    canPerformAction,
    actionLable,
  } = props;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={String(postVisibility)}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {postVisibility ? (
          <motion.div className="flex flex-col">
            <input
              className="w-full px-4 py-2 bg-neutral-50 dark:bg-zinc-800 rounded-md border border-neutral-400 focus:outline-none placeholder:italic placeholder-neutral-700 dark:placeholder-neutral-200 dark:border-neutral-500"
              type="text"
              placeholder={titlePlacehoder ?? 'title'}
              value={title}
              onChange={setTitle}
              autoFocus
            />
            <TextEditor
              className="mt-4"
              value={question}
              setValue={setQuestion}
              placeHolder={questionPlacehoder ?? 'Question'}
            />
            <div className="self-end mt-4 flex items-center">
              <button className="red-text-button mr-4" onClick={onCancle}>
                Cancel
              </button>
              <button
                className="blue-outline-button"
                disabled={
                  !canPerformAction ||
                  extractContent(question) === '' ||
                  title.trim() === ''
                }
                onClick={onDone}
              >
                {actionLable ?? 'Post'}
              </button>
            </div>
          </motion.div>
        ) : (
          <>{children}</>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default CreatePostView;
