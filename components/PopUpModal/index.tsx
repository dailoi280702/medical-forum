import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import MessageModal from './MessageModal';
import ErrorModal from './ErrorModal';
import ConfirmModal from './ConfirmModal';

type Props = {
  title: ReactNode;
  children: ReactNode;
  buttons: ReactNode;
  open: boolean;
  onClose: () => void;
};

const PopupModal = ({ title, children, buttons, open, onClose }: Props) => {
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
          <div className='backdrop-blur-sm fixed inset-0 bg-neutral-900/30 dark:bg-neutral-700/30 flex items-center justify-center'>
            <Dialog.Panel
              className='bg-neutral-50/80 dark:bg-neutral-900/80 text-neutral-900 dark:text-neutral-100 p-6 rounded-[1.75rem] min-w-[280px] max-w-[580px]'
              as={motion.div}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0.0 }}
            >
              <div className='text-2xl mb-4'>{title}</div>
              <div className='text-sm'>{children}</div>
              <div className='flex items-center justify-end space-x-2 mt-6'>
                {buttons}
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export { MessageModal, ErrorModal, ConfirmModal };

export default PopupModal;
