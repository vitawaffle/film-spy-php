import client from 'client';

const useInitCsrf = (): () => Promise<void> => async (): Promise<void> => {
  await client.get('/sanctum/csrf-cookie');
};

export default useInitCsrf;
