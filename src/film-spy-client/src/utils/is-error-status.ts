import { AxiosError } from 'axios';

const isErrorStatus = (error: unknown, status: number): boolean => error instanceof AxiosError
  && error.response !== undefined
  && error.response.status === status;

export default isErrorStatus;
