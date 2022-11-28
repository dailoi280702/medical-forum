import { QuestionContext } from '@/pages/question/[id]';
import { db } from '../../firebase/clientApp';
import { deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useContext, useMemo } from 'react';
import SavedPostsContext from './savedPostsContext';
import { useSession } from 'next-auth/react';
import { SavedPost } from '.';

const useSavePost = () => {
  const { data: session } = useSession();
  const post = useContext(QuestionContext);
  const savedPosts = useContext(SavedPostsContext);

  const saved = useMemo(() => {
    if (!post || !savedPosts || !session) return false;

    return savedPosts.has(post.id);
  }, [post, savedPosts, session]);

  const savePost = () => {
    if (!post || !savedPosts || !session) return;

    try {
      const docRef = doc(db, 'users', session.user.uid, 'savedPosts', post.id);

      if (saved) {
        deleteDoc(docRef);
        return;
      }

      setDoc(docRef, {
        postId: post.id,
        savedAt: serverTimestamp(),
      } as SavedPost);
    } catch (e) {
      console.log(e);
    }
  };

  return { saved, savePost };
};

export default useSavePost;
