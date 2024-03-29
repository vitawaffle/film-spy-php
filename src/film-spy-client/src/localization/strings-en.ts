import type { LocaleTemplate } from './strings';

const stringsEn: LocaleTemplate = {
  common: {
    logIn: 'Log in',
    logOut: 'Log out',
    signUp: 'Sign up',
    home: 'Home',
    email: 'Email',
    password: 'Password',
    passwordConfirmation: 'Password confirmation',
    rememberMe: 'Remember me',
    name: 'Name',
    create: 'Create',
    rooms: 'Rooms',
    join: 'Join',
    refresh: 'Refresh',
    players: 'Players',
    deleteRoom: 'Delete room',
    ok: 'Ok',
    cancel: 'Cancel',
    leave: 'Leave',
    leaveRoom: 'Leave room',
  },
  validation: {
    required: 'This field is required',
    email: 'Invalid email format',
    password: 'Password must be at least 8 characters long',
    passwordMismatch: 'Password mismatch',
    invalidCredentials: 'Invalid credentials',
    notUniqueEmail: 'This email is already taken',
    notUniqueName: 'This name is already exists',
    invalidPassword: 'Invalid password',
  },
  pages: {
    errors: {
      notFound: 'Oops! It seems you are lost. This page does not exist. Try to return to the Home.',
      unauthorized: 'You can\'t come here. Log in to the site to access this page.',
    },
    home: {
      currentRoom: 'Current room',
    },
    logIn: {
      title: 'Please, log in',
      noAccount: 'Don\'t have an account?',
    },
    signUp: {
      title: 'Please, sign up',
      haveAccount: 'Alredy have an account?',
    },
  },
  features: {
    rooms: {
      createRoomForm: {
        keepEmpty: 'Keep this field empty if room password is not needed',
      },
      createRoomModal: {
        createRoom: 'Create room',
      },
      roomList: {
        searchName: 'Search by name',
        noContent: 'No content',
      },
      roomListItem: {
        owner: 'Owner',
        players: 'Players',
      },
      joinRoomForm: {
        keepEmpty: 'Keep this field empty if the room does not have a password',
      },
      joinRoomModal: {
        joinRoom: 'Join',
      },
      kickPlayerButton: {
        kickPlayer: 'Kick player',
        kickPlayerQuestion: 'Do you really want to kick player',
      },
      startGameButton: {
        startGame: 'Start game',
      },
      userList: {
        inGame: 'In game',
      },
    },
    ui: {
      appBar: {
        game: 'Game',
      },
    },
  },
};

export default stringsEn;
