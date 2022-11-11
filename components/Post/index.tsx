import { db } from '../../firebase/clientApp';
import {
  collection,
  getCountFromServer,
  onSnapshot,
  onSnapshotsInSync,
  Timestamp,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import PostHead from './PostHead';
import PostContent from './PostContent';
import PostTool from './PostTools';

export interface DPost {
  authorId: string;
  authorName: string;
  authorImg: string;
  title: string;
  html: string;
  timeStamp: Timestamp;
  editDate?: Timestamp;
  numberOfComment?: number;
  numberOfWaitings?: number;
  interested?: number;
  sovledCommentId?: string;
}

export interface DInterested {
  userId: string;
  time: Timestamp;
}

const Post = ({ id, post }: { id: string; post: DPost }) => {
  const [interesteds, setInteresteds] = useState<Map<string, Timestamp>>(
    new Map()
  );

  useEffect(
    () =>
      onSnapshot(collection(db, 'interested', id, 'data'), (snapshot) => {
        setInteresteds(
          new Map(
            snapshot.docs.map((doc) => [doc.id, { ...doc.data() } as Timestamp])
          )
        );
      }),
    [id]
  );

  return (
    <li className='rounded-lg border cursor-pointer border-neutral-500 dark:border-neutral-600 mb-4 p-4 bg-neutral-50 dark:bg-zinc-800/50'>
      {/** img, username, edited, sovled **/}
      <PostHead
        authorName={post.authorName}
        authorImg={post.authorImg}
        timeStamp={post.timeStamp}
      />
      <div className='ml-12'>
        <hr className='my-4 border-neutral-300 dark:border-neutral-600' />
        <PostContent title={post.title} html={post.html} />
        <hr className='my-4 border-neutral-300 dark:border-neutral-600' />
        <PostTool
          solved={true}
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
    </li>
  );
};

export default Post;
