import client from 'client';

const useInitCsrf = () => {
  const initCsrf = async () => {
    await client.get('/sanctum/csrf-cookie');
  };

  return initCsrf;
};

export default useInitCsrf;
