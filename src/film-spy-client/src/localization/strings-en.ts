import { LocaleTemplate } from './strings';

const stringsEn: LocaleTemplate = {
  common: {
    logIn: 'Log in',
    logOut: 'Log out',
    signIn: 'Sign in',
    home: 'Home',
    email: 'Email',
    password: 'Password',
    passwordConfirmation: 'Password confirmation',
    rememberMe: 'Remember me',
    name: 'Name',
  },
  validation: {
    required: 'This field is required',
    email: 'Invalid email format',
    password: 'Password must be at least 8 characters long',
    passwordMismatch: 'Password mismatch',
    invalidCredentials: 'Invalid credentials',
    notUniqueEmail: 'This email is already taken',
  },
  pages: {
    errors: {
      notFound: 'Oops! It seems you are lost. This page does not exist. Try to return to the Home.',
    },
    rooms: {
      rooms: 'Rooms',
      noContent: 'Not content',
    },
  },
};

export default stringsEn;