import isErrorStatus from './is-error-status';

const isUnprocessableContentError = (error: unknown) => isErrorStatus(error, 422);

export default isUnprocessableContentError;
