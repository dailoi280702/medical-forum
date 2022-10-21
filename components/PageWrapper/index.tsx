const PageWrapper = ({ children }: { children: JSX.Element }) => {
  return (
    <div className='flex flex-col items-center h-screen bg-gray-50 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'>
      <div className='px-4 mx-auto max-w-6xl'>{children}</div>
    </div>
  );
};

export default PageWrapper;
