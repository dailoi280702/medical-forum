import { Timestamp } from 'firebase/firestore';

export type VoteDetail = {
  voteAt?: Timestamp;
  isLiked?: boolean;
};
