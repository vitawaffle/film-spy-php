import type { StringsTemplate } from './strings';

const stringsEn: StringsTemplate = {
  common: {
    cancel: 'Cancel',
    confirmPassword: 'Confirm password',
    create: 'Create',
    email: 'Email',
    home: 'Home',
    isRemember: 'Remember me',
    join: 'Join',
    keepPasswordEmpty: 'Keep this field empty if the room does not have a password',
    logIn: 'Log in',
    logOut: 'Log out',
    register: 'Register',
    name: 'Name',
    ok: 'Ok',
    password: 'Password',
    rooms: 'Rooms',
  },
  features: {
    rooms: {
      createRoomModal: {
        title: 'Create room',
      },
      joinRoomModal: {
        title: 'Join room',
      },
      roomList: {
        empty: 'No rooms found',
      },
      roomListItem: {
        owner: 'Owner',
        players: 'Players',
      },
    },
  },
  pages: {
    errors: {
      notFound: 'Oops! It seems you are lost. This page does not exist. Try to return to the Home.',
    },
    login: {
      title: 'Please, log in',
      noAccount: 'Don\'t have an account?',
    },
    register: {
      title: 'Please, register',
      haveAccount: 'Alredy have an account?',
    },
  },
  validation: {
    emailNotUnique: 'This email already exists',
    invalidCredentials: 'Invalid credentials',
    invalidPassword: 'Invalid password',
    nameNotUnique: 'This name already exists',
    password: 'The password must be at least 8 characters long',
    passwordMismatch: 'Password mismatch',
    required: 'This field is required',
  },
};

export default stringsEn;
