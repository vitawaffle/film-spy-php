import { LocaleTemplate } from './strings';

const stringsRu: LocaleTemplate = {
  common: {
    logIn: 'Войти',
    logOut: 'Выйти',
    signIn: 'Зарегистрироваться',
    home: 'Домой',
    email: 'Электронная почта',
    password: 'Пароль',
    passwordConfirmation: 'Подтверждение пароля',
    rememberMe: 'Запомнить меня',
    name: 'Имя',
    create: 'Создать',
    rooms: 'Комнаты',
  },
  validation: {
    required: 'Это поле обязательно',
    email: 'Неверный формат электронной почты',
    password: 'Пароль должен состоять не менее чем из 8 символов',
    passwordMismatch: 'Пароли не совпадают',
    invalidCredentials: 'Неверные учётные данные',
    notUniqueEmail: 'Этот адрес электронной почты уже занят',
    notUniqueName: 'Такое имя уже существует',
  },
  pages: {
    errors: {
      notFound: 'Упс! Кажется, вы заблудились. Такой страницы не существует. Попробуйте вернуться на главную.',
    },
    rooms: {
      noContent: 'Ничего не найдено',
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
      },
    },
  },
};

export default stringsRu;
