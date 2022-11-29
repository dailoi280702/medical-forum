import { createContext } from 'react';
import { WaitingDetail } from '.';

export const WaitingPostsContext = createContext<Map<string, WaitingDetail>>(
  new Map([])
);
