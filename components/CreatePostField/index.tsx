import { useState, useRef, useEffect, ChangeEvent } from 'react';

const CreatePostField = () => {
  const [content, setContent] = useState('');
  const [width, setWidth] = useState(0);
  const span = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (span) {
      setWidth(span.current!.offsetWidth);
    }
  }, [content]);

  const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setContent(evt.target.value);
  };

  return (
    <>
      <div>this is an input field</div>
      <div className='bg-blue-900 text-blue-100'>
        <input
          autoFocus
          className='text-2xl bg-white-200'
          style={{ width }}
          type='text'
          onChange={changeHandler}
        />
      </div>
      <span className='hidden' ref={span}></span>
    </>
  );
};

export default CreatePostField;
