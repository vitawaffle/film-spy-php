import type { StringsTemplate } from './strings';

const stringsRu: StringsTemplate = {
  common: {
    cancel: 'Отмена',
    close: 'Закрыть',
    confirmPassword: 'Подтвердите пароль',
    create: 'Создать',
    email: 'Электронная почта',
    home: 'Главная',
    isRemember: 'Запомни меня',
    join: 'Присоединиться',
    joined: 'Присоединено',
    keepPasswordEmpty: 'Оставьте это поле пустым, если пароль к команте не нужен',
    logIn: 'Войти',
    logOut: 'Выйти',
    register: 'Зарегистрироваться',
    resend: 'Выслать заново',
    name: 'Name',
    ok: 'Хорошо',
    password: 'Пароль',
    rooms: 'Комнаты',
    players: 'Игроки',
  },
  features: {
    email: {
      resendVerificationEmailButton: {
        resend: 'Выслать письмо с подтверждением снова',
        retryAfter: 'Попробуйте через',
        s: 'с',
      },
    },
    room: {
      deleteRoomButton: {
        deleteRoom: 'Удалить комнату',
      },
      kickUserButton: {
        kickUser: 'Исключить игрока',
      },
      leaveRoomButton: {
        leaveRoom: 'Покинуть комнату',
      },
    },
    rooms: {
      createRoomModal: {
        title: 'Создать комнату',
      },
      joinRoomModal: {
        title: 'Присоединиться к комнате',
      },
      roomList: {
        empty: 'Не найдено ни одной комнаты',
      },
      roomListItem: {
        owner: 'Владелец',
        players: 'Игроков',
      },
    },
  },
  pages: {
    errors: {
      emailNotVerified: 'Подтвердите свой адрес электронной почты, чтобы выполнить это действие. Не получили ' +
        'электронное письмо с подтверждением? Используйте кнопку внизу.',
      forbidden: 'Вам сюда нельзя! Получите соответствующие привилегии, чтобы попасть на эту страничку.',
      notFound: 'Упс! Кажется, вы заблудились. Такой страницы не существует. Попробуйте вернуться на главную.',
    },
    login: {
      title: 'Пожалуйста, войдите',
      noAccount: 'Нет аккаунта?',
    },
    register: {
      title: 'Пожалуйста, зарегистрируйтесь',
      haveAccount: 'Уже есть акаунт?',
    },
    room: {
      notJoined: 'Вы не присоединились к этой комнате',
    },
  },
  snack: {
    emailNotVerified: 'Электронная почта не подтверждена. Некоторый функционал недоступен. Не получили письмо с '
          + 'подтверждением? Используйте кнопку ниже.',
    roomCreated: 'Комната создана',
    roomDeleted: 'Комната удалена',
    userJoined: 'Пользователь присоединился',
    userKicked: 'Пользователь исключён',
    userLeft: 'Пользователь вышел',
    youAreKicked: 'Вы исключены из комнаты',
  },
  validation: {
    emailNotUnique: 'Этот адрес электронной уже существует',
    invalidCredentials: 'Неправильные учётные данные',
    invalidPassword: 'Неправильный пароль',
    nameNotUnique: 'Это имя уже существует',
    password: 'Пароль должен быть не меньше 8 символов',
    passwordMismatch: 'Пароли не совпадают',
    required: 'Это поле обязательно',
  },
};

export default stringsRu;
