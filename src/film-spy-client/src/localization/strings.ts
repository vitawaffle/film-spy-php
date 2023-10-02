import LocalizedStrings from 'react-localization';

import stringsEn from './strings-en';
import stringsRu from './strings-ru';

export type StringsTemplate = {
  common: {
    cancel: string,
    close: string,
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
    resend: string,
    name: string,
    ok: string,
    password: string,
    rooms: string,
    players: string,
  },
  features: {
    auth: {
      emailNotVerifiedSnackbar: {
        emailNotVerified: string,
      },
    },
    email: {
      resendVerificationEmailButton: {
        resend: string,
        retryAfter: string,
        s: string,
      },
    },
    room: {
      deleteRoomButton: {
        deleteRoom: string,
      },
      kickUserButton: {
        kickUser: string,
      },
      leaveRoomButton: {
        leaveRoom: string,
      },
      roomDeletedSnackbar: {
        roomDeleted: string,
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
      emailNotVerified: string,
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
    room: {
      notJoined: string,
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
