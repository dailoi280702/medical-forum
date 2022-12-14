import { db } from '../../firebase/clientApp';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import {
  ChangeEvent,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from 'react';
import { CreatePostView } from '../CreatePostField';
import { DPost } from '../Post';
import { ErrorModal, MessageModal } from '../PopUpModal';

type Props = {
  id: string;
  post: DPost;
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};

const UpdatePost = (props: Props) => {
  const { id, post, children, editMode, setEditMode } = props;
  const [question, setQuestion] = useState(post.html);
  const [title, setTitle] = useState(post.title);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [error, setError] = useState<any>(null);

  const canPostComment = useMemo(
    () =>
      question.trim() !== post.html.trim() ||
      title.trim() !== post.title.trim(),
    [post.html, post.title, question, title]
  );

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const cancle = () => {
    setEditMode(false);
    setQuestion(post.html);
    setTitle(post.title);
  };

  const updatePost = async () => {
    try {
      if (!id) {
        console.log(id);
        return;
      }

      await setDoc(doc(db, 'question', id as string), {
        ...post,
        title: title,
        html: question,
        editedDate: serverTimestamp(),
      });
      setEditMode(false);
      setModalVisibility(true);
    } catch (e) {
      setError(e);
      setModalVisibility(true);
    }
  };

  return (
    <>
      <CreatePostView
        title={title}
        question={question}
        postVisibility={!editMode}
        setTitle={changeTitle}
        setQuestion={setQuestion}
        onDone={updatePost}
        onCancle={cancle}
        canPerformAction={canPostComment}
        actionLable='Update'
      >
        {children}
      </CreatePostView>
      {error ? (
        <ErrorModal
          closeText='Got it'
          open={modalVisibility}
          onClose={() => {
            setModalVisibility(false);
            if (error) {
              setError(null);
            }
          }}
        >
          <p>{error}</p>
        </ErrorModal>
      ) : (
        <MessageModal
          title='Success!'
          closeText='Got it'
          open={modalVisibility}
          onClose={() => {
            setModalVisibility(false);
          }}
        >
          <p>Your question have been updated</p>
        </MessageModal>
      )}
    </>
  );
};

export default UpdatePost;
