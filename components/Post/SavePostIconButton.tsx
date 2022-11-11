import { BookmarkIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkFilled } from '@heroicons/react/24/solid';

type Props = {
  saved: boolean;
  onClick: () => void;
};

const SavePostIconButton = ({ saved, onClick }: Props) => {
  return (
    <button
      className={`group ml-auto flex items-center ${
        saved ? 'text-blue-600 dark:text-blue-400' : ''
      }`}
      onClick={onClick}
    >
      <p className='mr-2 text-sm hidden md:inline-block'>
        {saved ? 'Saved' : 'Save'}
      </p>
      {saved ? (
        <BookmarkFilled className='h-6 w-6group-hover:scale-95 transition-all duration-200' />
      ) : (
        <BookmarkIcon className='h-6 w-6 group-hover:scale-110 transition-all duration-200' />
      )}
    </button>
  );
};

export default SavePostIconButton;
