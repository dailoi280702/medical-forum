import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

type Props = {
  numberOfComments: number;
};

const CommentIconButton = ({ numberOfComments }: Props) => {
  return (
    <div className='ml-8 flex items-center'>
      <ChatBubbleLeftIcon className='h-6 w-6' />
      <p className='ml-2 text-sm'>
        {numberOfComments > 1
          ? `${numberOfComments} comments`
          : `${numberOfComments} comment`}
      </p>
    </div>
  );
};

export default CommentIconButton;
