import React, { useContext, useMemo } from 'react';
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ChatBubbleLeftIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import {
  HandThumbUpIcon as HandThumbUpIconFilled,
  HandThumbDownIcon as HandThumbDownIconFilled,
  CheckCircleIcon as CheckCircleIconFilled,
} from '@heroicons/react/24/solid';
import { StanddardIconButton } from '../Button';
import { useSession } from 'next-auth/react';
import CommentDropdownMenu from './CommentDropdownMenu';
import { useMarkCommentAsSolution } from '../MarkCommentAsSolution';
import { useSetVoteComment } from '../VoteComment';

type Props = {
  html: string;
  numberOfLikes: number;
  numberOfDislikes: number;
  isCommentAuthor?: boolean;
  isPostAuthor?: boolean;
  isSolution?: boolean;
  isLiked?: boolean;
  isDisliked?: boolean;
  hasChild?: boolean;
  onLike?: () => any;
  onDislike?: () => any;
  onComment?: () => any;
  onEdit?: () => any;
  onDelete?: () => any;
  onMark?: () => any;
};

const CommentDetail: React.FC<Props> = ({
  html,
  numberOfLikes,
  numberOfDislikes,
  isCommentAuthor,
  isPostAuthor,
  onComment,
  onEdit,
  onDelete,
  hasChild,
}) => {
  const { data: session } = useSession();
  const { isSolution, markCommentAsSolution } = useMarkCommentAsSolution();
  const { isLiked, isDisliked, voteComment } = useSetVoteComment();
  const canBeModified = useMemo(
    () => !isSolution && !hasChild,
    [hasChild, isSolution]
  );

  return (
    <div className="group">
      <div
        className="none-preflight post-content my-3"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {session && (
        <div className="flex items-center space-x-4">
          {' '}
          <StanddardIconButton
            primaryColor="blue"
            active={isLiked}
            activeChildren={
              <HandThumbUpIconFilled className="text-blue-500 dark:text-blue-200" />
            }
            text={String(numberOfLikes)}
            onClick={() => voteComment('like')}
          >
            <HandThumbUpIcon />
          </StanddardIconButton>
          <StanddardIconButton
            primaryColor="blue"
            active={isDisliked}
            activeChildren={
              <HandThumbDownIconFilled className="text-blue-500 dark:text-blue-200" />
            }
            text={String(numberOfDislikes)}
            onClick={() => voteComment('disLike')}
          >
            <HandThumbDownIcon />
          </StanddardIconButton>
          <StanddardIconButton text={'reply'} onClick={onComment}>
            <ChatBubbleLeftIcon />
          </StanddardIconButton>
          {isCommentAuthor && (
            <CommentDropdownMenu
              markEnabled={isPostAuthor && isCommentAuthor}
              deleteEnabled={canBeModified}
              editEnabled={canBeModified}
              marked={isSolution}
              onMark={markCommentAsSolution}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          )}
          {!isCommentAuthor && isPostAuthor && (
            <StanddardIconButton
              primaryColor="green"
              onClick={markCommentAsSolution}
              active={isSolution}
              activeChildren={
                <CheckCircleIconFilled className="text-green-600 dark:text-green-400" />
              }
            >
              <CheckCircleIcon />
            </StanddardIconButton>
          )}
          {session && (
            <div className="hidden group-hover:inline-flex items-center space-x-2"></div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentDetail;
