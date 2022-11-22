import 'react-quill/dist/quill.snow.css';
import { Dispatch, RefObject, SetStateAction } from 'react';

interface Props {
  value: string;
  placeHolder?: string;
  setValue: Dispatch<SetStateAction<string>>;
  className?: string;
  ref?: RefObject<any>;
  onFocus?: () => any;
  onFocusOut?: () => any;
}

const TextEditor = ({
  value,
  placeHolder,
  setValue,
  className,
  onFocus,
  onFocusOut,
}: Props) => {
  const ReactQuill =
    typeof window === 'object' ? require('react-quill') : () => false;

  return (
    <ReactQuill
      className={className}
      value={value}
      onChange={setValue}
      placeholder={placeHolder}
      theme='snow'
      onFocus={onFocus}
      onBlur={onFocusOut}
    />
  );
};

export default TextEditor;
