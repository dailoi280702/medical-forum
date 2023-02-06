import { useRouter } from 'next/router';
import Post, { DPost } from '@/components/Post';
import PostWrapper from '../Post/PostWrapper';
import { QuestionContext } from '@/pages/question/[id]';
import { RefObject } from 'react';

type Props = {
  posts: Map<string, DPost>;
  loading?: boolean;
  listRef?: RefObject<HTMLUListElement>;
};

const DefaultPostsList = ({ posts, loading, listRef }: Props) => {
  const router = useRouter();

  const openPostDetail = (id: string) => {
    return () => {
      router.push(`/question/${id}`);
    };
  };

  return (
    <>
      <ul ref={listRef}>
        {posts.size > 0 &&
          Array.from(posts).map((value) => (
            <PostWrapper
              key={value[0]}
              darkerBorder={true}
              onClick={openPostDetail(value[0])}
            >
              <QuestionContext.Provider value={{ id: value[0], ...value[1] }}>
                <Post
                  id={value[0]}
                  post={value[1]}
                  onclick={openPostDetail(value[0])}
                />
              </QuestionContext.Provider>
            </PostWrapper>
          ))}
      </ul>
      {loading && (
        <div className="w-full text-center text-neutral-300 dark:text-neutral-700 mt-8">
          loading ... please wait
        </div>
      )}
    </>
  );
};

export default DefaultPostsList;
