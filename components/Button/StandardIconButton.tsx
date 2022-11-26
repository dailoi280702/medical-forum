import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  primaryColor?: Colors;
  children: JSX.Element;
  activeChildren?: JSX.Element;
  text?: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => any;
};

type Colors = 'green' | 'red' | 'blue' | 'gray';

const buttonColors: Record<Colors, string> = {
  green: `hover:bg-green-600/10 dark:hover:bg-green-400/10 aria-pressed:bg-green-600/30 aria-pressed:focus:bg-green-400/30`,
  red: `hover:bg-red-600/10 dark:hover:bg-red-400/10 aria-pressed:bg-red-600/30 dark:aria-pressed:bg-red-400/30`,
  blue: `hover:bg-blue-600/10 dark:hover:bg-blue-400/10 aria-pressed:bg-blue-600/30 dark:aria-pressed:bg-blue-400/30`,
  gray: `hover:bg-gray-500/10 dark:hover:bg-gray-200/10 aria-pressed:bg-gray-500/30 dark:aria-pressed:bg-gray-200/30`,
};

const textColor: Record<Colors, string> = {
  green: `text-green-500 dark:text-green-200`,
  red: `text-red-500 dark:text-red-200`,
  blue: `text-blue-500 dark:text-blue-200`,
  gray: `text-gray-500 dark:text-gray-200`,
};

const StanddardIconButton = (props: Props) => {
  const {
    primaryColor,
    children,
    text,
    active,
    activeChildren,
    disabled,
    onClick,
  } = props;

  return (
    <div className='inline-flex items-center space-x-1'>
      <AnimatePresence mode='wait'>
        <motion.button
          className={
            buttonColors[primaryColor ?? 'gray'] +
            'transition-all rounded-full h-10 w-10 p-2 text-gray-600/80 dark:text-gray-100/80 focus:outline-none disabled:text-neutral-800/40 dark:disabled:text-neutral-100/40'
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          key={String(active)}
          disabled={disabled}
          onClick={onClick}
        >
          {!active ? children : activeChildren}
        </motion.button>
      </AnimatePresence>
      {text && (
        <motion.p
          className={`hidden sm:inline ${
            active ? textColor[primaryColor ?? 'gray'] : ''
          }`}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default StanddardIconButton;
