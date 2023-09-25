import LocalizedStrings from 'react-localization';

import stringsEn from './strings-en';
import stringsRu from './strings-ru';

export type StringsTemplate = {
  common: {
    cancel: string,
    confirmPassword: string,
    create: string,
    email: string,
    home: string,
    isRemember: string,
    join: string,
    joined: string,
    keepPasswordEmpty: string,
    logIn: string,
    logOut: string,
    register: string,
    name: string,
    ok: string,
    password: string,
    rooms: string,
    players: string,
  },
  features: {
    room: {
      deleteRoomButton: {
        deleteRoom: string,
      },
    },
    rooms: {
      createRoomModal: {
        title: string,
      },
      joinRoomModal: {
        title: string,
      },
      roomList: {
        empty: string,
      },
      roomListItem: {
        owner: string,
        players: string,
      },
    },
  },
  pages: {
    errors: {
      forbidden: string,
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
    invalidPassword: string,
    nameNotUnique: string,
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
