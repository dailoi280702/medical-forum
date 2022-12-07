import { createContext } from 'react';
import { VoteDetail } from './type';

export const VotedCommentsContext = createContext<Map<string, VoteDetail>>(
  new Map()
);
