import { Menu } from '@headlessui/react';
import {
  EllipsisHorizontalIcon,
  TrashIcon,
  PencilIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

import { CheckCircleIcon as CheckCircleIconFilled } from '@heroicons/react/24/solid';
import StanddardIconButton from '@/components/Button/StandardIconButton';
import { motion } from 'framer-motion';

type Props = {
  marked?: boolean;
  markEnabled?: boolean;
  editEnabled?: boolean;
  deleteEnabled?: boolean;
  onDelete?: () => any;
  onEdit?: () => any;
  onMark?: () => any;
};

const CommentDropdownMenu = ({
  marked,
  markEnabled,
  editEnabled,
  deleteEnabled,
  onEdit,
  onDelete,
  onMark,
}: Props) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button as="div">
        <StanddardIconButton>
          <EllipsisHorizontalIcon />
        </StanddardIconButton>
      </Menu.Button>
      <Menu.Items
        as={motion.div}
        layout
        className="flex space-x-1 mt-1 p-2 absolute right-0 shadow border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-100 dark:bg-neutral-800"
      >
        {deleteEnabled && (
          <Menu.Item as="div">
            <StanddardIconButton primaryColor="red" onClick={onDelete}>
              <TrashIcon />
            </StanddardIconButton>
          </Menu.Item>
        )}
        {editEnabled && (
          <Menu.Item as="div">
            <StanddardIconButton primaryColor="gray" onClick={onEdit}>
              <PencilIcon />
            </StanddardIconButton>
          </Menu.Item>
        )}
        {markEnabled && (
          <Menu.Item as="div">
            <StanddardIconButton
              primaryColor="green"
              onClick={onMark}
              active={marked}
              activeChildren={
                <CheckCircleIconFilled className="text-green-500 dark:text-green-200" />
              }
            >
              <CheckCircleIcon />
            </StanddardIconButton>
          </Menu.Item>
        )}
      </Menu.Items>
    </Menu>
  );
};

export default CommentDropdownMenu;
