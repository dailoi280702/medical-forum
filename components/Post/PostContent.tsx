type Props = {
  title: string;
  html: string;
};

const PostContent = ({ title, html }: Props) => {
  return (
    <section>
      <div className='font-semibold text-xl'>{title}</div>
      <div
        className='none-preflight post-content'
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </section>
  );
};

export default PostContent;
