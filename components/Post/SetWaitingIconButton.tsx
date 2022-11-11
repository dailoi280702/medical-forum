import { ClockIcon } from '@heroicons/react/24/outline';
import { ClockIcon as ClockFilled } from '@heroicons/react/24/solid';

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
  return (
    <button
      className={`group flex items-center ${
        interested ? 'text-orange-600 dark:text-orange-400' : ''
      }`}
      onClick={onClick}
    >
      {interested ? (
        <ClockFilled className='h-6 w-6 group-hover:scale-95 transition-all duration-200' />
      ) : (
        <ClockIcon className='h-6 w-6 group-hover:scale-110 transition-all duration-200' />
      )}
      <p className='ml-2 text-sm'>
        {numberOfInteresteds > 1
          ? `${numberOfInteresteds} waiting for solution`
          : `${numberOfInteresteds} waiting for solution`}
      </p>
    </button>
  );
};

export default SetWaitingIconButton;
