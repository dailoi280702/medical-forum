import TextEditor from '../TextEditor';
import { useSession, signIn } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import PopupModal from '../PopUpModal';
import useCreatePost from './CreatePostHook';

const extractContent = (html: string) => {
  return new DOMParser().parseFromString(html, 'text/html').documentElement
    .textContent;
};

const CreatePostField = () => {
  const { data: session } = useSession();
  const { values, events, state } = useCreatePost();

  return (
    <>
      {session ? (
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={String(values.createPostVisibility)}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {values.createPostVisibility ? (
              <motion.div className='flex flex-col'>
                <input
                  className='w-full px-4 py-2 bg-neutral-50 dark:bg-zinc-800 rounded-md border border-neutral-400 focus:outline-none placeholder:italic placeholder-neutral-700 dark:placeholder-neutral-200 dark:border-neutral-500'
                  type='text'
                  placeholder='Title'
                  value={values.title}
                  onChange={events.setTitle}
                  autoFocus
                />
                <TextEditor
                  className='mt-4'
                  value={values.question}
                  setValue={events.setQuestion}
                  placeHolder='Question'
                />
                <div className='self-end mt-4 flex items-center'>
                  <button
                    className='red-text-button mr-4'
                    onClick={events.cancelPost}
                  >
                    Cancel
                  </button>
                  <button
                    className='blue-outline-button'
                    disabled={
                      extractContent(values.question) === '' ||
                      values.title.trim() === ''
                    }
                    onClick={events.addPost}
                  >
                    Post
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div>
                <button onClick={() => events.setCreatePostVisibility(true)}>
                  Show
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <p className='w-full text-center text-xl'>
          <button
            className='font-semibold opacity-80 hover:opacity-100 hover:underline hover:scale-105 text-blue-600 dark:text-blue-400 transition-transform'
            onClick={() => signIn()}
          >
            Sign In
          </button>{' '}
          to post a question
        </p>
      )}
      <PopupModal
        title='Congragte'
        open={values.modalVisibility}
        onClose={() => {
          events.setModalVisibility(false);
          if (state.error) {
            events.clearError();
          }
        }}
        isWarning={state.error}
      >
        {state.error ? (
          <div>{state.error.message}</div>
        ) : (
          <p>Your question have been posted</p>
        )}
      </PopupModal>
    </>
  );
};

export default CreatePostField;
