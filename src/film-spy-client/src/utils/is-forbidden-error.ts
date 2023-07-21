import isErrorStatus from './is-error-status';

const isForbiddenError = (error: unknown): boolean => isErrorStatus(error, 403);

export default isForbiddenError;
