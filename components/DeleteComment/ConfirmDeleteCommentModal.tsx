import { useContext } from 'react';
import { ConfirmModal } from '../PopUpModal';
import {
  DeleteCommentContext,
  DeleteCommentActionType,
} from './deleteCommentContext';
import useDeleteComment from './useDeteteComment';

const ConfirmDeleteCommentModal = () => {
  const deleteCommentContext = useContext(DeleteCommentContext);
  const deleteComment = useDeleteComment();

  const closeConfirmModal = () => {
    if (!deleteCommentContext) return;

    deleteCommentContext.action({
      type: DeleteCommentActionType.toggleModal,
      payload: { modalVisible: false },
    });
  };

  return (
    <>
      {deleteCommentContext && (
        <ConfirmModal
          title="Confirm Deletion"
          open={Boolean(deleteCommentContext!.state.modalVisible)}
          onClose={closeConfirmModal}
          onConfirm={deleteComment}
          confirmText="Delete"
          cancleText="Cancle"
        >
          <p className="text-sm">
            This action <strong>Can not</strong> be undo
            <br /> Are you sure to continue?
          </p>
        </ConfirmModal>
      )}
    </>
  );
};

export default ConfirmDeleteCommentModal;
