import type { StringsTemplate } from './strings';

const stringsEn: StringsTemplate = {
  common: {
    confirmPassword: 'Confirm password',
    email: 'Email',
    home: 'Home',
    isRemember: 'Remember me',
    logIn: 'Log in',
    logOut: 'Log out',
    register: 'Register',
    name: 'Name',
    password: 'Password',
    rooms: 'Rooms',
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
    password: 'The password must be at least 8 characters long',
    passwordMismatch: 'Password mismatch',
    required: 'This field is required',
  },
};

export default stringsEn;
