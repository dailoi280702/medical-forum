type Props = {
  title: string;
  html: string;
  edited?: boolean;
};

const PostContent = ({ title, html, edited }: Props) => {
  return (
    <section>
      <div className='font-semibold text-xl mb-2'>
        {title}{' '}
        {edited && (
          <span className='text-neutral-500 dark:text-neutral-400 font-light'>
            [ edited ]
          </span>
        )}
      </div>
      <div
        className='none-preflight post-content'
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </section>
  );
};

export default PostContent;
