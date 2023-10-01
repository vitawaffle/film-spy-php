import isErrorStatus from './is-error-status';

const isTooManyRequestsError = (error: unknown): boolean => isErrorStatus(error, 429);

export default isTooManyRequestsError;
