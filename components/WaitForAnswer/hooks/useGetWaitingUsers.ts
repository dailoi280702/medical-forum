import { DPost } from '@/components/Post';
import { useState } from 'react';
import { WaitingDetail } from '..';

const useGetWaitingUsers = (question: DPost) => {
  const waitingUsers = useState<Map<string, WaitingDetail>>(new Map());
};

export { useGetWaitingUsers };
