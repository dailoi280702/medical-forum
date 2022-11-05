import Post from '../Post';

const PostList = () => {
  const posts = [...Array(10)].map((i) => {
    return (
      <div key={i}>
        <Post />
      </div>
    );
  });

  return <div>{posts}</div>;
};

export default PostList;
