import LocalizedStrings from 'react-localization';

import stringsEn from './strings-en';
import stringsRu from './strings-ru';

export type StringsTemplate = {
  common: {
    confirmPassword: string,
    email: string,
    home: string,
    isRemember: string,
    logIn: string,
    logOut: string,
    register: string,
    name: string,
    password: string,
    rooms: string,
  },
  pages: {
    errors: {
      notFound: string,
    },
    login: {
      title: string,
      noAccount: string,
    },
    register: {
      title: string,
      haveAccount: string,
    },
  },
  validation: {
    emailNotUnique: string,
    invalidCredentials: string,
    password: string,
    passwordMismatch: string,
    required: string,
  },
};

const strings = new LocalizedStrings({
  en: stringsEn,
  ru: stringsRu,
});

export default strings;
