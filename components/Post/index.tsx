import { db } from '../../firebase/clientApp';
import { collection, onSnapshot, Timestamp } from 'firebase/firestore';
import { useState, useEffect, ReactNode } from 'react';
import PostHead from './PostHead';
import PostContent from './PostContent';
import PostTool from './PostTools';

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
  sovledCommentId?: string;
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
  // const [interesteds, setInteresteds] = useState<Map<string, Timestamp>>(
  //   new Map()
  // );
  //
  // useEffect(
  //   () =>
  //     onSnapshot(collection(db, 'interested', id, 'data'), (snapshot) => {
  //       setInteresteds(
  //         new Map(
  //           snapshot.docs.map((doc) => [doc.id, { ...doc.data() } as Timestamp])
  //         )
  //       );
  //     }),
  //   [id]
  // );

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
      <div className='ml-12'>
        <hr className='my-4 border-neutral-300 dark:border-neutral-600' />
        <PostContent title={post.title} html={post.html} />
        <hr className='my-4 border-neutral-300 dark:border-neutral-600' />
        <PostTool
          solved={Boolean(post.sovledCommentId)}
          numberOfWaitings={0}
          numberOfComments={0}
          saved={true}
          interested={true}
          savePost={() => {
            console.log('save clicked');
          }}
          setInterested={() => {
            console.log('set interested clicked');
          }}
        />
      </div>
    </>
  );
};

export default Post;
