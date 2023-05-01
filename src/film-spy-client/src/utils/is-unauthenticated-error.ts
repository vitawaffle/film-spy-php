import isErrorStatus from './is-error-status';

const isUnauthenticatedError = (error: unknown) => isErrorStatus(error, 401);

export default isUnauthenticatedError;
