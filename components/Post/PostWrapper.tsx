import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  darkerBorder?: boolean;
  onClick?: () => void;
};

const PostWrapper: React.FC<Props> = (props) => {
  const { children, darkerBorder, onClick } = props;

  return (
    <AnimatePresence>
      <motion.div
        className={`rounded-lg border mb-4 p-4 sm:pr-8 bg-neutral-50 dark:bg-zinc-800/50 list-none ${
          onClick ? 'cursor-pointer' : ''
        } ${
          darkerBorder
            ? 'border-neutral-500 dark:border-neutral-600'
            : 'border-neutral-400 dark:border-neutral-700'
        }`}
        onClick={(e) => {
          e.preventDefault();
          if (e.target === e.currentTarget && onClick) {
            onClick();
          }
        }}
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PostWrapper;
