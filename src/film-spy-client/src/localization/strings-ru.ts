import type { StringsTemplate } from './strings';

const stringsRu: StringsTemplate = {
  common: {
    cancel: 'Отмена',
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
    name: 'Name',
    ok: 'Хорошо',
    password: 'Пароль',
    rooms: 'Комнаты',
    players: 'Игроки',
  },
  features: {
    room: {
      deleteRoomButton: {
        deleteRoom: 'Удалить комнату',
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
