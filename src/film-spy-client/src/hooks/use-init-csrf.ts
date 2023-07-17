import client from 'client';

const useInitCsrf = (): () => Promise<void> => {
  const initCsrf = async (): Promise<void> => {
    await client.get('/sanctum/csrf-cookie');
  };

  return initCsrf;
};

export default useInitCsrf;
