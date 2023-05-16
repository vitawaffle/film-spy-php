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
    join: string,
    current: string,
    refresh: string,
    players: string,
    deleteRoom: string,
    ok: string,
    cancel: string,
  },
  validation: {
    required: string,
    email: string,
    password: string,
    passwordMismatch: string,
    invalidCredentials: string,
    notUniqueEmail: string,
    notUniqueName: string,
    invalidPassword: string,
  },
  pages: {
    errors: {
      notFound: string,
    },
    home: {
      currentRoom: string,
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
      roomList: {
        searchName: string,
        noContent: string,
      },
      joinRoomForm: {
        keepEmpty: string,
      },
      joinRoomModal: {
        joinRoom: string,
      },
    },
  },
};
