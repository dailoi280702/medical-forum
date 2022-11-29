import { db } from '../../../firebase/clientApp';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { ReactNode, useEffect, useState } from 'react';
import { SavedPost, SavedPostsContext } from '..';

const SavePostsProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [savedPosts, setSavedPosts] = useState<Map<string, SavedPost>>(
    new Map()
  );

  useEffect(() => {
    if (!session) return;

    onSnapshot(
      query(
        collection(db, 'users', session.user.uid, 'savedPosts'),
        orderBy('savedAt', 'desc')
      ),
      (snapshot) => {
        setSavedPosts(
          new Map(
            snapshot.docs.map((doc) => [
              doc.id,
              { ...(doc.data() as SavedPost) },
            ])
          )
        );
      }
    );
  }, [session]);

  return (
    <SavedPostsContext.Provider value={savedPosts}>
      {children}
    </SavedPostsContext.Provider>
  );
};

export default SavePostsProvider;
