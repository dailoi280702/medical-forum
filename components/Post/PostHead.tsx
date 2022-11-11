import { Timestamp } from 'firebase/firestore';
import Image from 'next/image';
import Moment from 'react-moment';

type Props = {
  authorName: string;
  authorImg: string;
  timeStamp?: Timestamp;
};

const PostHead = ({ authorName, authorImg, timeStamp }: Props) => {
  return (
    <section className='flex items-center'>
      <div className='relative rounded-full w-8 h-8 overflow-hidden mr-4'>
        <Image
          className='rounded-full object-cover overflow-hidden'
          src={authorImg}
          alt={authorName}
          fill
        />
      </div>
      <div className='text-sm'>
        <p className='font-medium text-neutral-700 dark:text-neutral-200'>
          {authorName}
        </p>
        {timeStamp && (
          <Moment className='text-neutral-500 dark:text-neutral-400' fromNow>
            {timeStamp.toDate()}
          </Moment>
        )}
      </div>
    </section>
  );
};

export default PostHead;
