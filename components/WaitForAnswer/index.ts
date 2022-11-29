import { Timestamp } from 'firebase/firestore';

export * from './components';
export * from './useSetWaiting';
export * from './waitingPostsContex';

export type WaitingDetail = {
  postId?: string;
  userId?: string;
  setWaitingAt?: Timestamp;
};
