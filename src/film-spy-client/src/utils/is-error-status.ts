import { AxiosError } from 'axios';

const isErrorStatus = (error: unknown, status: number) =>
  error instanceof AxiosError
    && error.response !== undefined
    && error.response.status === status;

export default isErrorStatus;
