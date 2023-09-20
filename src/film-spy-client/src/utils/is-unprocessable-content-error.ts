import isErrorStatus from './is-error-status';

const isUnprocessableContentError = (error: unknown): boolean => isErrorStatus(error, 422);

export default isUnprocessableContentError;
