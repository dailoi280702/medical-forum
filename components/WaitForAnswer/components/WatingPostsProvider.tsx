import { db } from '../../../firebase/clientApp';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { ReactNode, useEffect, useState } from 'react';
import { WaitingDetail, WaitingPostsContext } from '..';

const WaitingPostsProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [waitingPosts, setWaitingPosts] = useState<Map<string, WaitingDetail>>(
    new Map()
  );

  useEffect(() => {
    if (!session) return;

    onSnapshot(
      query(
        collection(db, 'users', session.user.uid, 'waitingPosts'),
        orderBy('setWaitingAt', 'desc')
      ),
      (snapshot) => {
        setWaitingPosts(
          new Map(
            snapshot.docs
              .filter((doc) => doc.data())
              .map((doc) => [doc.id, { ...(doc.data() as WaitingDetail) }])
          )
        );
      }
    );
  }, [session]);

  return (
    <WaitingPostsContext.Provider value={waitingPosts}>
      {children}
    </WaitingPostsContext.Provider>
  );
};

export { WaitingPostsProvider };
