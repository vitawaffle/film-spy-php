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
    logOut: string,
    signIn: string,
    home: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    rememberMe: string,
    name: string,
    create: string,
    rooms: string,
  },
  validation: {
    required: string,
    email: string,
    password: string,
    passwordMismatch: string,
    invalidCredentials: string,
    notUniqueEmail: string,
    notUniqueName: string,
  },
  pages: {
    errors: {
      notFound: string,
    },
    rooms: {
      noContent: string,
    },
  },
  features: {
    rooms: {
      createRoomForm: {
        keepEmpty: string,
      },
      createRoomModal: {
        createRoom: string,
      },
    },
  },
};
