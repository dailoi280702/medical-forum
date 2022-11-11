const PageWrapper = ({ children }: { children: JSX.Element }) => {
  return (
    <div className='flex flex-col items-center bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100'>
      <div className='p-4 mx-auto w-full max-w-screen-md'>{children}</div>
    </div>
  );
};

export default PageWrapper;
