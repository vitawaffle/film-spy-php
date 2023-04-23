import * as yup from 'yup';
import { StringSchema } from 'yup';
import { isBlank } from 'utils';

yup.addMethod<StringSchema>(
  yup.string,
  'password',
  function (this, message = 'invalid password format') {
    return this.test(
      'password',
      message,
      value => isBlank(value) || (value as string).length >= 8,
    );
  },
);

declare module 'yup' {
  interface StringSchema {
    password: (message?: string) => StringSchema;
  }
}

export default yup;
