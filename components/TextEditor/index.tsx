import 'react-quill/dist/quill.snow.css';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  value: string;
  placeHolder?: string;
  setValue: Dispatch<SetStateAction<string>>;
  className?: string;
}

const TextEditor = ({ value, placeHolder, setValue, className }: Props) => {
  const ReactQuill =
    typeof window === 'object' ? require('react-quill') : () => false;

  return (
    <ReactQuill
      className={className}
      value={value}
      onChange={setValue}
      placeholder={placeHolder}
      theme="snow"
    />
  );
};

export default TextEditor;
