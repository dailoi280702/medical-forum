import { createContext } from 'react';
import { WaitingDetail } from '.';

export const WaitingDetailsContext = createContext<Map<string, WaitingDetail>>(
  new Map([])
);
