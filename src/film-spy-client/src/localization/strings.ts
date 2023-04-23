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
    rememberMe: string,
    invalidCredentials: string,
  },
  validation: {
    required: string,
  },
  pages: {
    errors: {
      notFound: string,
    },
  },
};
