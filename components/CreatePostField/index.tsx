import { useState, useRef, useEffect, ChangeEvent } from 'react';
import TextEditor from '../TextEditor';
import { useSession, signIn } from 'next-auth/react';

const CreatePostField = () => {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <TextEditor />
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
    </>
  );
};

export default CreatePostField;