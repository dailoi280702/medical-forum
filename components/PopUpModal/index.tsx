import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilState } from 'recoil';

type Props = {
  title: string;
  children: JSX.Element;
  open: boolean;
  onClose: () => void;
  closeText?: string;
  confirmText?: string;
  onDone?: () => void;
  isWarning?: boolean;
};

const PopupModal = ({
  title,
  children,
  open,
  onClose,
  closeText,
  confirmText,
  onDone,
  isWarning,
}: Props) => {
  return (
    <AnimatePresence>
      {open && (
        <Dialog
          static
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          open={open}
          onClose={onClose}
        >
          <div className='backdrop-blur-sm fixed inset-0 bg-neutral-900/30 darK:bg-neutral-700/30 flex items-center justify-center'>
            <Dialog.Panel
              className='flex flex-col bg-neutral-50/80 dark:bg-neutral-900/80 text-neutral-900 dark:text-neutral-100 p-6 rounded-[1.75rem] min-w-[280px] max-w-[580px]'
              as={motion.div}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0.0 }}
            >
              <Dialog.Title className='text-2xl mb-4'>{title}</Dialog.Title>
              <div>{children}</div>
              <div className='self-end mt-6'>
                <button
                  className={isWarning ? 'red-text-button' : 'blue-text-button'}
                  onClick={onClose}
                >
                  {closeText ? closeText : 'Got It'}
                </button>
                {confirmText && onDone && (
                  <button
                    className={
                      (isWarning ? 'red-text-button' : 'blue-text-button') +
                      'ml-4'
                    }
                    onClick={() => {
                      onClose();
                      onDone();
                    }}
                  >
                    {confirmText}
                  </button>
                )}
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default PopupModal;
