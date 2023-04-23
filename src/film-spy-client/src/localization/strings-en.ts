import { LocaleTemplate } from './strings';

const stringsEn: LocaleTemplate = {
  common: {
    logIn: 'Log in',
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
  },
  pages: {
    errors: {
      notFound: 'Oops! It seems you are lost. This page does not exist. Try to return to the Home.',
    },
  },
};

export default stringsEn;
