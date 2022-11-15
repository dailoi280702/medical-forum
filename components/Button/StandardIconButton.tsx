import { useMemo } from 'react';

type Props = {
  primaryColor: Colors;
  children: JSX.Element;
  disabled?: boolean;
  onClick?: () => any;
};

type Colors = 'green' | 'red';

const colorClasses: Record<Colors, string> = {
  green: `rounded-full h-10 w-10 p-2 text-green-600/80 dark:text-green-400/80 hover:bg-green-600/10 dark:hover:bg-green-400/10 aria-pressed:bg-green-600/20 aria-pressed:focus:bg-green-400/20 focus:outline-none disabled:text-neutral-800/40 dark:disabled:text-neutral-100/40`,
  red: `rounded-full h-10 w-10 p-2 text-red-600/80 dark:text-red-400/80 hover:bg-red-600/10 dark:hover:bg-red-400/10 aria-pressed:bg-red-600/30 dark:aria-pressed:bg-red-400/30 focus:outline-none disabled:text-neutral-800/40 dark:disabled:text-neutral-100/40`,
};

const StanddardIconButton = (props: Props) => {
  const { primaryColor, children, disabled, onClick } = props;

  return (
    <button
      className={colorClasses[primaryColor]}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default StanddardIconButton;
