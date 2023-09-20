import LocalizedStrings from 'react-localization';

import stringsEn from './strings-en';
import stringsRu from './strings-ru';

export type StringsTemplate = {
  common: {
    email: string,
    home: string,
    isRemember: string,
    logIn: string,
    logOut: string,
    register: string,
    password: string,
    rooms: string,
  },
  pages: {
    errors: {
      notFound: string,
    },
    login: {
      title: string,
      
    },
  },
  validation: {
    invalidCredentials: string,
    required: string,
  },
};

const strings = new LocalizedStrings({
  en: stringsEn,
  ru: stringsRu,
});

export default strings;
