import { useState, useEffect, ChangeEvent } from 'react';
import { useSession } from 'next-auth/react';

import { db } from '../../firebase/clientApp';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const CreatePostHook = () => {
  const { data: session } = useSession();
  const [question, setQuestion] = useState<string>('');
  const [createPostVisibility, setCreatePostVisibility] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [modalVisibility, setModalVisibility] = useState(false);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/hello');
      const data = await res.json();
      setQuestion(data.name);
    };

    fetchData();
  }, []);

  const cancelPost = () => {
    setCreatePostVisibility(false);
    setQuestion('');
    setTitle('');
  };

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const clearError = () => {
    setError(null);
  };

  const addPost = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, 'question'), {
        authorName: session?.user.name!,
        authorImg: session?.user.image!,
        authorId: session?.user.uid!,
        title: title,
        html: question,
        timeStamp: serverTimestamp(),
      });

      setTitle('');
      setQuestion('');
      setModalVisibility(true);
    } catch (e) {
      setError(e);
      setModalVisibility(true);
    }
    setLoading(false);
  };

  return {
    values: {
      question,
      title,
      modalVisibility,
      createPostVisibility,
    },
    events: {
      setQuestion,
      setTitle: changeTitle,
      setCreatePostVisibility,
      setModalVisibility,
      cancelPost,
      addPost,
      clearError,
    },
    state: {
      error,
      loading,
    },
  };
};

export default CreatePostHook;
