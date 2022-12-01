import { Timestamp } from 'firebase/firestore';

export * from './components';
export * from './hooks';
export * from './waitingDetailsContext';

export type WaitingDetail = {
  postId?: string;
  userId?: string;
  setWaitingAt?: Timestamp;
};
