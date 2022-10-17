import { getProviders, signIn as nextSignIn } from 'next-auth/react';
import { InferGetServerSidePropsType } from 'next';
import Header from '@/components/Header';

const signIn = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className='h-screen bg-gray-50 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'>
      <Header />
      <div className='flex flex-col justify-center items-center min-h-screen py-2 px-14 -mt-56 text-center'>
        <p className='italic text-xs'>
          This is not a REAL app, it is built for educational purposes only
        </p>
        <div className='mt-40'>
          {providers &&
            Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  className='px-6 py-2 rounded-full bg-blue-600 text-white dark:bg-blue-200 dark:text-blue-800 shadow-gray-600 shadow'
                  onClick={() => nextSignIn(provider.id, { callbackUrl: '/' })}
                >
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
        </div>{' '}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};

export default signIn;
