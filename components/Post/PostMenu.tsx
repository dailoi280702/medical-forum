import StanddardIconButton from '@/components/Button/StandardIconButton';
import {
  TrashIcon,
  PencilIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';
import { motion } from 'framer-motion';

type Props = {
  deleteDisabled?: boolean;
  editDisabled?: boolean;
  onDelete: () => any;
  onEdit: () => any;
};

const PostMenu = ({
  deleteDisabled,
  editDisabled,
  onDelete,
  onEdit,
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
        <Menu.Item as="div">
          <StanddardIconButton
            primaryColor="red"
            disabled={deleteDisabled}
            onClick={onDelete}
          >
            <TrashIcon />
          </StanddardIconButton>
        </Menu.Item>
        <Menu.Item as="div">
          <StanddardIconButton disabled={editDisabled} onClick={onEdit}>
            <PencilIcon />
          </StanddardIconButton>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default PostMenu;
