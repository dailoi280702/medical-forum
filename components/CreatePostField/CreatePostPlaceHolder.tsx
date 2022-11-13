import { motion } from 'framer-motion';

type Props = {
  placeHolder: string;
  onClick: () => void;
};

const CreatePostPlaceHolder = ({ placeHolder, onClick }: Props) => {
  return (
    <motion.div
      className='w-full px-4 py-2 cursor-text bg-neutral-50 dark:bg-zinc-800 rounded-md border focus:outline-none italic text-neutral-700 dark:text-neutral-200 border-neutral-500 dark:border-neutral-600 dark:hover:border-neutral-500 hover:border-neutral-400'
      onClick={onClick}
    >
      {placeHolder}
    </motion.div>
  );
};

export default CreatePostPlaceHolder;
