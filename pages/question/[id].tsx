import { DPost } from '@/components/Post';
import { db } from '../../firebase/clientApp';
import { doc, onSnapshot, deleteDoc } from 'firebase/firestore';
// import type { GetStaticProps } from 'next';
import Header from '@/components/Header';
import PageWrapper from '@/components/PageWrapper';
import Post from '@/components/Post';
import { useRouter } from 'next/router';
import { useEffect, useState, useMemo } from 'react';
import PostWrapper from '@/components/Post/PostWrapper';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { StanddardIconButton } from '@/components/Button';
import { ConfirmModal } from '@/components/PopUpModal';
import PageNotFound from '@/components/PageNotFound';
import UpdatePost from '@/components/UpdatePost';
import { useSession } from 'next-auth/react';

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const [post, setPost] = useState<DPost>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const loadedWithMemo = useMemo(() => loaded, [loaded]);

  // useEffect(
  //   () =>
  //     onSnapshot(doc(db, 'question', 'kF2sROabBdcuGjJUL5IN'), (snapshot) => {
  //       setPost(snapshot.data() as DPost);
  //       console.log(post);
  //       console.log('dlkj');
  //       setLoaded(true);
  //     }),
  //   [id]
  // );

  useEffect(() => {
    {
      if (!id) return;

      onSnapshot(doc(db, 'question', id as string), (snapshot) => {
        setPost(snapshot.data() as DPost);
        setLoaded(true);
      });
    }
  }, [id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const deleteQuestion = async () => {
    try {
      router.push('/');
      await deleteDoc(doc(db, 'question', id as string));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='h-screen w-full bg-neutral-100 dark:bg-neutral-900 dark:border- top-0 z-[-1] absolute' />
      <Header />
      <PageWrapper>
        {loadedWithMemo && (
          <>
            {post ? (
              <PostWrapper>
                {id && (
                  <UpdatePost
                    id={id as string}
                    post={post}
                    editMode={!editMode}
                    setEditMode={setEditMode}
                  >
                    <Post id={id as string} post={post}>
                      {post.authorId === session?.user.uid && (
                        <div className='ml-auto flex items-center space-x-2'>
                          <StanddardIconButton
                            primaryColor='red'
                            disabled={post.numberOfComment == 0}
                            onClick={openModal}
                          >
                            <TrashIcon />
                          </StanddardIconButton>
                          <StanddardIconButton
                            primaryColor='green'
                            disabled={post.numberOfComment == 0}
                            onClick={() => setEditMode(true)}
                          >
                            <PencilIcon />
                          </StanddardIconButton>
                        </div>
                      )}
                    </Post>
                  </UpdatePost>
                )}
              </PostWrapper>
            ) : (
              <PageNotFound />
            )}
          </>
        )}
      </PageWrapper>
      <ConfirmModal
        title='Confirm Deletion'
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={deleteQuestion}
        confirmText='Delete'
        cancleText='Cancle'
      >
        <>
          <p className='text-sm'>
            This action <strong>Can not</strong> be undo
            <br /> Are you sure to continue?
          </p>
        </>
      </ConfirmModal>
    </>
  );
};

// export const getStaticPaths = async () => {
//   const snapshot = await getDocs(collection(db, 'question'));
//   const paths = snapshot.docs.map((doc) => ({
//     params: { id: doc.id },
//   }));
//
//   return {
//     paths: paths,
//     fallback: false,
//   };
// };
//
// export const getStaticProps: GetStaticProps<{ post: DPost }> = async ({
//   params,
// }) => {
//   const docRef = doc(db, 'question', params!.id as string);
//   const snapshot = await getDoc(docRef);
//   const post = snapshot.data() as DPost;
//   post.timeStamp = null;
//
//   return {
//     props: { post: post },
//   };
// };

export default PostPage;
