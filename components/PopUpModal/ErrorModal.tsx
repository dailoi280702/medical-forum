import PopupModal from '.';

type Props = {
  title?: string;
  open: boolean;
  onClose: () => void;
  closeText: string;
  children: JSX.Element;
};

const ErrorModal = (props: Props) => {
  const { title, open, onClose, closeText, children } = props;

  return (
    <PopupModal
      open={open}
      onClose={onClose}
      title={title ?? 'Opss!'}
      buttons={
        <button className='red-text-button' onClick={onClose}>
          {closeText}
        </button>
      }
    >
      <div className='text-red-600 dark:text-red-400'>{children}</div>
    </PopupModal>
  );
};

export default ErrorModal;
