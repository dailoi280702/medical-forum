import {
  BookmarkIcon,
  ClockIcon,
  ChatBubbleLeftIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import {
  BookmarkIcon as BookmarkFilled,
  ClockIcon as ClockFilled,
  ChatBubbleLeftIcon as ChatBubbleLeftFilled,
} from '@heroicons/react/24/solid';
import CommentIconButton from './CommentIconButton';
import SavePostIconButton from './SavePostIconButton';
import SetWaitingIconButton from './SetWaitingIconButton';

type Props = {
  numberOfWaitings: number;
  numberOfComments: number;
  saved: boolean;
  solved: boolean;
  interested: boolean;
  savePost: () => void;
  setInterested: () => void;
};

const PostTool = ({
  numberOfWaitings: numberOfInteresteds,
  numberOfComments,
  saved,
  solved,
  interested,
  setInterested,
  savePost,
}: Props) => {
  return (
    <section className='flex items-center'>
      {solved ? (
        <>
          <CheckCircleIcon className='h-6 w-6 text-green-600 dark:text-green-400' />
          <p className='text-sm ml-2 text-green-600 dark:text-green-400'>
            Soved
          </p>
        </>
      ) : (
        <SetWaitingIconButton
          interested={interested}
          numberOfInteresteds={numberOfInteresteds}
          onClick={setInterested}
        />
      )}
      <CommentIconButton numberOfComments={numberOfComments} />
      <SavePostIconButton saved={saved} onClick={savePost} />
    </section>
  );
};

export default PostTool;
