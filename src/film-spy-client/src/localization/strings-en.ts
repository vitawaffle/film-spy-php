import type { StringsTemplate } from './strings';

const stringsEn: StringsTemplate = {
  common: {
    cancel: 'Cancel',
    close: 'Close',
    confirmPassword: 'Confirm password',
    create: 'Create',
    email: 'Email',
    games: 'Games',
    home: 'Home',
    isRemember: 'Remember me',
    join: 'Join',
    joined: 'Joined',
    keepPasswordEmpty: 'Keep this field empty if the room does not have a password',
    logIn: 'Log in',
    logOut: 'Log out',
    register: 'Register',
    resend: 'Resend',
    name: 'Name',
    ok: 'Ok',
    password: 'Password',
    rooms: 'Rooms',
    players: 'Players',
  },
  features: {
    email: {
      resendVerificationEmailButton: {
        resend: 'Resend verification email',
        retryAfter: 'Retry after',
        s: 's',
      },
    },
    games: {
      gameList: {
        empty: 'No games found',
      },
    },
    room: {
      deleteRoomButton: {
        deleteRoom: 'Delete room',
      },
      kickUserButton: {
        kickUser: 'Kick user',
      },
      leaveRoomButton: {
        leaveRoom: 'Leave room',
      },
      startGameButton: {
        startGame: 'Start game',
      },
    },
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
      emailNotVerified: 'Verify your email to complete this action. Didn\'t receive a confirmation email? Use the ' +
        'button below.',
      forbidden: 'You can\'t come here! Get the appropriate privileges to access this page.',
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
    room: {
      notJoined: 'You are not joined to this room',
    },
  },
  snack: {
    emailNotVerified: 'Email not verified. Some functionality is not available. Didn\'t receive a confirmation '
          + ' email? Use the button below.',
    gameStarted: 'Game started',
    roomCreated: 'Room created',
    roomDeleted: 'Room deleted',
    userJoined: 'User joined',
    userKicked: 'User kicked',
    userLeft: 'User left',
    youAreKicked: 'You are kicked from the room',
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
