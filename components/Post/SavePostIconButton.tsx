import { BookmarkIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkFilled } from '@heroicons/react/24/solid';
import { useSavePost } from '../SavePost';

const SavePostIconButton = () => {
  const { saved: isSaved, savePost } = useSavePost();

  return (
    <button
      className={`group ml-auto flex items-center ${
        isSaved ? 'text-blue-600 dark:text-blue-400' : ''
      }`}
      onClick={savePost}
    >
      <p className="mr-2 text-sm hidden md:inline-block">
        {isSaved ? 'Saved' : 'Save'}
      </p>
      {isSaved ? (
        <BookmarkFilled className="h-6 w-6 group-hover:scale-95 transition-all duration-200" />
      ) : (
        <BookmarkIcon className="h-6 w-6 group-hover:scale-110 transition-all duration-200" />
      )}
    </button>
  );
};

export default SavePostIconButton;
