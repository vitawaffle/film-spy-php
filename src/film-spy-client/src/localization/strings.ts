import LocalizedStrings from 'react-localization';
import stringsEn from './strings-en';
import stringsRu from './strings-ru';

const strings = new LocalizedStrings({
  en: stringsEn,
  ru: stringsRu,
});

export default strings;

export type LocaleTemplate = {
  common: {
    logIn: string,
    signIn: string,
    home: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    rememberMe: string,
    name: string,
  },
  validation: {
    required: string,
    email: string,
    password: string,
    passwordMismatch: string,
    invalidCredentials: string,
    notUniqueEmail: string,
  },
  pages: {
    errors: {
      notFound: string,
    },
  },
};
