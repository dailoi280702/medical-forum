import { ClockIcon } from '@heroicons/react/24/outline';
import { ClockIcon as ClockFilled } from '@heroicons/react/24/solid';
import { useSetWaiting } from '../WaitForAnswer';

type Props = {
  interested: boolean;
  numberOfInteresteds: number;
  onClick: () => void;
};

const SetWaitingIconButton = ({
  interested,
  numberOfInteresteds,
  onClick,
}: Props) => {
  const { isWaiting, setWatingForPost } = useSetWaiting();

  return (
    <button
      className={`group flex items-center ${
        isWaiting ? 'text-orange-600 dark:text-orange-400' : ''
      }`}
      onClick={setWatingForPost}
    >
      {isWaiting ? (
        <ClockFilled className="h-6 w-6 group-hover:scale-95 transition-all duration-200" />
      ) : (
        <ClockIcon className="h-6 w-6 group-hover:scale-110 transition-all duration-200" />
      )}
      <p className="ml-2 text-sm flex">
        {numberOfInteresteds}
        <span className="hidden sm:block ml-1">waiting for solution</span>
      </p>
    </button>
  );
};

export default SetWaitingIconButton;
