const PageWrapper = ({ children }: { children: JSX.Element }) => {
  return (
    <div className='flex flex-col items-center bg-gray-50 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'>
      <div className='p-4 mx-auto max-w-screen-lg'>{children}</div>
    </div>
  );
};

export default PageWrapper;