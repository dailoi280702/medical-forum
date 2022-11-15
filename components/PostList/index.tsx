import {
  collection,
  collectionGroup,
  getCountFromServer,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import Post, { DPost } from '../Post';
import { useState, useEffect } from 'react';
import { db } from '../../firebase/clientApp';
import { useRouter } from 'next/router';
import PostWrapper from '../Post/PostWrapper';

const PostList = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Map<string, DPost>>(new Map([]));

  const getUpvote = async () => {
    const snapshot = await getCountFromServer(collection(db, 'likes'));
    return snapshot.data().count;
  };

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'question'), orderBy('timeStamp', 'desc')),
        (snapshot) => {
          setPosts(
            new Map(
              snapshot.docs.map((doc) => [
                doc.id,
                {
                  ...(doc.data() as DPost),
                },
              ])
            )
          );
        }
      ),
    []
  );

  return (
    <ul>
      {posts.size > 0 &&
        Array.from(posts).map((value) => (
          <PostWrapper
            key={value[0]}
            darkerBorder={true}
            onClick={() => {
              router.push(`/question/${value[0]}`);
            }}
          >
            <Post id={value[0]} post={value[1]} />
          </PostWrapper>
        ))}
    </ul>
  );
};

export default PostList;
