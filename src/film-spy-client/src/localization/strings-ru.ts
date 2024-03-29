import type { LocaleTemplate } from './strings';

const stringsRu: LocaleTemplate = {
  common: {
    logIn: 'Войти',
    logOut: 'Выйти',
    signUp: 'Зарегистрироваться',
    home: 'Домой',
    email: 'Электронная почта',
    password: 'Пароль',
    passwordConfirmation: 'Подтверждение пароля',
    rememberMe: 'Запомнить меня',
    name: 'Имя',
    create: 'Создать',
    rooms: 'Комнаты',
    join: 'Присоедениться',
    refresh: 'Обновить',
    players: 'Игроки',
    deleteRoom: 'Удалить комнату',
    ok: 'Хорошо',
    cancel: 'Отмена',
    leave: 'Выйти',
    leaveRoom: 'Выйти из комнаты',
  },
  validation: {
    required: 'Это поле обязательно',
    email: 'Неверный формат электронной почты',
    password: 'Пароль должен состоять не менее чем из 8 символов',
    passwordMismatch: 'Пароли не совпадают',
    invalidCredentials: 'Неверные учётные данные',
    notUniqueEmail: 'Этот адрес электронной почты уже занят',
    notUniqueName: 'Такое имя уже существует',
    invalidPassword: 'Неверный пароль',
  },
  pages: {
    errors: {
      notFound: 'Упс! Кажется, вы заблудились. Такой страницы не существует. Попробуйте вернуться на главную.',
      unauthorized: 'Вам сюда нельзя! Авторизируйтесь на сайте, чтобы попасть на эту страничку.',
    },
    home: {
      currentRoom: 'Текущая комната',
    },
    logIn: {
      title: 'Пожалуйста, войдите',
      noAccount: 'Нет аккаунта?',
    },
    signUp: {
      title: 'Пожалуйста, зарегистрируйтесь',
      haveAccount: 'Уже есть аккаунт?',
    },
  },
  features: {
    rooms: {
      createRoomForm: {
        keepEmpty: 'Оставьте это поле пустым, если пароль к команте не нужен',
      },
      createRoomModal: {
        createRoom: 'Создать комнату',
      },
      roomList: {
        searchName: 'Найти по имени',
        noContent: 'Ничего не найдено',
      },
      roomListItem: {
        owner: 'Владелец',
        players: 'Игроки',
      },
      joinRoomForm: {
        keepEmpty: 'Оставьте это поле пустым, если в комнате нет пароля',
      },
      joinRoomModal: {
        joinRoom: 'Присоедениться',
      },
      kickPlayerButton: {
        kickPlayer: 'Выгнать игрока',
        kickPlayerQuestion: 'Вы действитель хотите выгнать игрока',
      },
      startGameButton: {
        startGame: 'Начать игру',
      },
      userList: {
        inGame: 'В игре',
      },
    },
    ui: {
      appBar: {
        game: 'Игра',
      },
    },
  },
};

export default stringsRu;
