import { db } from '../../../firebase/clientApp';
import {
  collection,
  CollectionReference,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { ReactNode, useEffect, useState } from 'react';
import { WaitingDetail, WaitingDetailsContext } from '..';
import { DPost } from '@/components/Post';
import { CollectionEnum } from '@/firebase/enum';

type getType = 'posts' | 'users';

type Props = {
  getType?: getType;
  post?: DPost & { id: string };
  children: ReactNode;
};

const WaitingDetailsProvider = ({
  getType = 'posts',
  post,
  children,
}: Props) => {
  const { data: session } = useSession();
  const [waitingDetails, setWaitingPosts] = useState<
    Map<string, WaitingDetail>
  >(new Map());

  useEffect(() => {
    if (!session) return;

    if (getType === 'users' && !post) return;

    const collections: Record<getType, CollectionReference<DocumentData>> = {
      posts: collection(
        db,
        CollectionEnum.USERS,
        session.user.uid,
        CollectionEnum.WAITINGDETAILS
      ),
      users: collection(
        db,
        CollectionEnum.QUESTIONS,
        post?.id ?? 'error',
        CollectionEnum.WAITINGDETAILS
      ),
    };

    onSnapshot(
      query(collections[getType], orderBy('setWaitingAt', 'desc')),
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
  }, [session, getType, post]);

  return (
    <WaitingDetailsContext.Provider value={waitingDetails}>
      {children}
    </WaitingDetailsContext.Provider>
  );
};

export { WaitingDetailsProvider as WaitingPostsProvider };
