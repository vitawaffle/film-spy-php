import type { StringsTemplate } from './strings';

const stringsEn: StringsTemplate = {
  common: {
    email: 'Email',
    home: 'Home',
    isRemember: 'Remember me',
    logIn: 'Log in',
    logOut: 'Log out',
    register: 'Register',
    password: 'Password',
    rooms: 'Rooms',
  },
  pages: {
    errors: {
      notFound: 'Oops! It seems you are lost. This page does not exist. Try to return to the Home.',
    },
  },
  validation: {
    invalidCredentials: 'Invalid credentials',
    required: 'This field is required',
  },
};

export default stringsEn;
