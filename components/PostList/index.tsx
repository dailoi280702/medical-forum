import {
  collection,
  collectionGroup,
  getCountFromServer,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';
import Post, { DPost } from '../Post';
import { useState, useEffect } from 'react';
import { db } from '../../firebase/clientApp';

// const fakeData: PostProps[] = [
//   {
//     authorName: 'Joseph Zodwa',
//     authorImg:
//       'https://twitter.com/lolesports/status/1456758516493045773/photo/1',
//     title: 'fake',
//     html: '<div>aaa<div>',
//     timeStamp: new Timestamp(1667721427, 0),
//   },
//   {
//     authorName: 'Joseph Zodwa',
//     authorImg:
//       'https://twitter.com/lolesports/status/1456758516493045773/photo/1',
//     title: 'fake',
//     html: '<div>aaa<div>',
//     timeStamp: new Timestamp(1667721427, 0),
//   },
//   {
//     authorName: 'Joseph Zodwa',
//     authorImg:
//       'https://twitter.com/lolesports/status/1456758516493045773/photo/1',
//     title: 'fake',
//     html: '<div>aaa<div>',
//     timeStamp: new Timestamp(1667721427, 0),
//   },
//   {
//     authorName: 'Joseph Zodwa',
//     authorImg:
//       'https://twitter.com/lolesports/status/1456758516493045773/photo/1',
//     title: 'fake',
//     html: '<div>aaa<div>',
//     timeStamp: new Timestamp(1667721427, 0),
//   },
//   {
//     authorId: '1',
//     authorName: 'Joseph Zodwa',
//     authorImg:
//       'https://twitter.com/lolesports/status/1456758516493045773/photo/1',
//     title: 'fake',
//     html: '<div>aaa<div>',
//     timeStamp: new Timestamp(1667721427, 0),
//   },
// ];

const PostList = () => {
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
          <Post key={value[0]} id={value[0]} post={value[1]} />
        ))}
    </ul>
  );
};

export default PostList;
