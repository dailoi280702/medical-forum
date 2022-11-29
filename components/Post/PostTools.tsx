import { CheckCircleIcon } from '@heroicons/react/24/outline';
import CommentIconButton from './CommentIconButton';
import SavePostIconButton from './SavePostIconButton';
import SetWaitingIconButton from './SetWaitingIconButton';

type Props = {
  numberOfWaitings: number;
  numberOfComments: number;
  solved: boolean;
};

const PostTool = ({
  numberOfWaitings: numberOfInteresteds,
  numberOfComments,
  solved,
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
        <SetWaitingIconButton numberOfInteresteds={numberOfInteresteds} />
      )}
      <CommentIconButton numberOfComments={numberOfComments} />
      <SavePostIconButton />
    </section>
  );
};

export default PostTool;
