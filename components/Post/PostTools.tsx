import { CheckCircleIcon } from '@heroicons/react/24/outline';
import CommentIconButton from './CommentIconButton';
import SavePostIconButton from './SavePostIconButton';
import SetWaitingIconButton from './SetWaitingIconButton';

type Props = {
  numberOfWaitings: number;
  numberOfComments: number;
  solved: boolean;
  interested: boolean;
  setInterested: () => void;
};

const PostTool = ({
  numberOfWaitings: numberOfInteresteds,
  numberOfComments,
  solved,
  interested,
  setInterested,
}: Props) => {
  return (
    <section className="flex items-center">
      {solved ? (
        <>
          <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
          <p className="text-sm ml-2 text-green-600 dark:text-green-400">
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
      <SavePostIconButton />
    </section>
  );
};

export default PostTool;
