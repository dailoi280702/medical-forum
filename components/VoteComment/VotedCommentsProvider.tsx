import { ReactNode } from 'react';
import { useGetVotedComments } from './hooks';
import { VotedCommentsContext } from './VotedCommentsContext';

export const VotedCommentsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const votedComments = useGetVotedComments();

  return (
    <VotedCommentsContext.Provider value={votedComments}>
      {children}
    </VotedCommentsContext.Provider>
  );
};
