import { AxiosError } from 'axios';

const isUnprocessableContentError = (error: unknown) =>
  error instanceof AxiosError
    && error.response !== undefined
    && error.response.status === 422;

export default isUnprocessableContentError;
