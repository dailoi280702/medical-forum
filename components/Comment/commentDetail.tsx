import React, { useState } from 'react';
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ChatBubbleLeftIcon,
  CheckCircleIcon,
  PencilIcon,
  TrashIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';
import {
  HandThumbUpIcon as HandThumbUpIconFilled,
  HandThumbDownIcon as HandThumbDownIconFilled,
  CheckCircleIcon as CheckCircleIconFilled,
} from '@heroicons/react/24/solid';
import { StanddardIconButton } from '../Button';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import CommentDropdownMenu from './CommentDropdownMenu';

type Props = {
  html: string;
  numberOfLikes: number;
  numberOfDislikes: number;
  isCommentAuthor?: boolean;
  isPostAuthor?: boolean;
  isSolution?: boolean;
  isLiked?: boolean;
  isDisliked?: boolean;
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
  isLiked,
  isDisliked,
  onLike,
  onDislike,
  onComment,
  onEdit,
  onDelete,
  onMark,
  isSolution,
}) => {
  const { data: session } = useSession();

  return (
    <div className="group">
      <div
        className="none-preflight post-content my-1"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className="flex items-center my-1 space-x-4">
        {' '}
        <StanddardIconButton
          primaryColor="blue"
          active={isLiked}
          activeChildren={
            <HandThumbUpIconFilled className="text-blue-500 dark:text-blue-200" />
          }
          text={String(numberOfLikes)}
          onClick={onLike}
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
          onClick={onDislike}
        >
          <HandThumbDownIcon />
        </StanddardIconButton>
        <StanddardIconButton text={'reply'} onClick={onComment}>
          <ChatBubbleLeftIcon />
        </StanddardIconButton>
        {isCommentAuthor && (
          <CommentDropdownMenu
            markEnabled={isPostAuthor && isCommentAuthor}
            deleteEnabled={true}
            editEnabled={true}
            marked={isSolution}
            onMark={onMark}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
        {!isCommentAuthor && isPostAuthor && (
          <StanddardIconButton
            primaryColor="green"
            onClick={onMark}
            active={isSolution}
            activeChildren={
              <CheckCircleIconFilled className="text-green-500 dark:text-green-200" />
            }
          >
            <CheckCircleIcon />
          </StanddardIconButton>
        )}
        {session && (
          <div className="hidden group-hover:inline-flex items-center space-x-2"></div>
        )}
      </div>
    </div>
  );
};

export default CommentDetail;
