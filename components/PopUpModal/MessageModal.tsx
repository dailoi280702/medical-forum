import PopupModal from '.';

type Props = {
  title: string;
  open: boolean;
  onClose: () => void;
  closeText: string;
  children: JSX.Element;
};

const MessageModal = (props: Props) => {
  const { title, open, onClose, closeText, children } = props;

  return (
    <PopupModal
      open={open}
      onClose={onClose}
      title={title}
      buttons={
        <button className="blue-text-button" onClick={onClose}>
          {closeText}
        </button>
      }
    >
      {children}
    </PopupModal>
  );
};

export default MessageModal;
