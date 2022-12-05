import { db } from '../../../firebase/clientApp';
import {
  collection,
  CollectionReference,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { ReactNode, useEffect, useState } from 'react';
import { WaitingDetail, WaitingDetailsContext } from '..';
import { DPost } from '@/components/Post';
import { CollectionEnum } from '@/firebase/enum';

type Props = {
  children: ReactNode;
};

const WaitingDetailsProvider = ({ children }: Props) => {
  const { data: session } = useSession();
  const [waitingDetails, setWaitingPosts] = useState<
    Map<string, WaitingDetail>
  >(new Map());

  useEffect(() => {
    if (!session) return;

    onSnapshot(
      query(
        collection(db, CollectionEnum.QUESTIONS),
        where('waitingUsers', 'array-contains', session.user.uid),
        where('solvedCommentId', '==', null)
      ),
      (snapshot) => {
        setWaitingPosts(
          new Map(
            snapshot.docs
              .filter((doc) => doc.data())
              .reverse()
              .map((doc) => [doc.id, { ...(doc.data() as WaitingDetail) }])
          )
        );
      }
    );
  }, [session]);

  return (
    <WaitingDetailsContext.Provider value={waitingDetails}>
      {children}
    </WaitingDetailsContext.Provider>
  );
};

export { WaitingDetailsProvider as WaitingPostsProvider };
