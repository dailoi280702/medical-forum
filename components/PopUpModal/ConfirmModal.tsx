import PopupModal from '.';

type Props = {
  title: string;
  open: boolean;
  confirmText: string;
  cancleText: string;
  onClose: () => any;
  onConfirm: () => any;
  children: JSX.Element;
};

const ConfirmModal = (props: Props) => {
  const { title, open, onClose, confirmText, cancleText, onConfirm, children } =
    props;

  return (
    <PopupModal
      open={open}
      onClose={onClose}
      title={title}
      buttons={
        <>
          <button className='red-text-button' onClick={onConfirm}>
            {confirmText}
          </button>
          <button className='red-text-button' onClick={onClose}>
            {cancleText}
          </button>
        </>
      }
    >
      {children}
    </PopupModal>
  );
};

export default ConfirmModal;
