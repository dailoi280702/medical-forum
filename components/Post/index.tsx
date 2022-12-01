import { db } from '../../firebase/clientApp';
import { collection, onSnapshot, Timestamp } from 'firebase/firestore';
import { useState, useEffect, ReactNode } from 'react';
import PostHead from './PostHead';
import PostContent from './PostContent';
import PostTool from './PostTools';
import PostMenu from './PostMenu';
import { useSession } from 'next-auth/react';

export interface DPost {
  authorId: string;
  authorName: string;
  authorImg: string;
  title: string;
  html: string;
  timeStamp: Timestamp | null;
  editedDate?: Timestamp;
  numberOfComment?: number;
  numberOfWaitings?: number;
  interested?: number;
  solvedCommentId?: string;
}

export interface DInterested {
  userId: string;
  time: Timestamp;
}

const Post = ({
  id,
  post,
  children,
}: {
  id: string;
  post: DPost;
  children?: ReactNode;
}) => {
  const { data: session } = useSession();

  return (
    <>
      {/** img, username, edited, sovled **/}
      <div className='flex items-center'>
        <PostHead
          authorName={post.authorName}
          authorImg={post.authorImg}
          timeStamp={post.timeStamp}
        />
        {children}
      </div>
      <div className='sm:ml-12'>
        <hr className='my-4 border-neutral-300 dark:border-neutral-600' />
        <PostContent
          title={post.title}
          html={post.html}
          edited={Boolean(post.editedDate)}
        />
        {session && (
          <>
            <hr className='my-4 border-neutral-300 dark:border-neutral-600' />
            <PostTool
              solved={Boolean(post.solvedCommentId)}
              numberOfWaitings={post.numberOfWaitings ?? 0}
              numberOfComments={post.numberOfComment ?? 0}
            />
          </>
        )}
      </div>
    </>
  );
};

export { PostMenu };

export default Post;
