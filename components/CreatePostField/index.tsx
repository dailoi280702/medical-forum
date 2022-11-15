import { useSession, signIn } from 'next-auth/react';
import { MessageModal, ErrorModal } from '../PopUpModal';
import useCreatePost from './CreatePostHook';
import CreatePostPlaceHolder from './CreatePostPlaceHolder';
import CreatePostView from './CreatePostView';

export const extractContent = (html: string) => {
  return new DOMParser().parseFromString(html, 'text/html').documentElement
    .textContent;
};

const CreatePostField = () => {
  const { data: session } = useSession();
  const { values, events, state } = useCreatePost();

  return (
    <>
      {session ? (
        <CreatePostView
          question={values.question}
          title={values.title}
          postVisibility={values.createPostVisibility}
          setQuestion={events.setQuestion}
          setTitle={events.setTitle}
          onDone={events.addPost}
          onCancle={events.cancelPost}
        >
          <CreatePostPlaceHolder
            placeHolder='Create a question'
            onClick={() => events.setCreatePostVisibility(true)}
          />
        </CreatePostView>
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
      {state.error ? (
        <ErrorModal
          closeText='Got it'
          open={values.modalVisibility}
          onClose={() => {
            events.setModalVisibility(false);
            if (state.error) {
              events.clearError();
            }
          }}
        >
          <p>{state.error}</p>
        </ErrorModal>
      ) : (
        <MessageModal
          title='Success!'
          closeText='Got it'
          open={values.modalVisibility}
          onClose={() => {
            events.setModalVisibility(false);
            if (state.error) {
              events.clearError();
            }
          }}
        >
          <p>Your question have been posted</p>
        </MessageModal>
      )}
    </>
  );
};

export { CreatePostView };

export default CreatePostField;
