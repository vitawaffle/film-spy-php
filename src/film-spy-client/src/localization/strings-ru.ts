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
  },
  validation: {
    required: 'Это поле обязательно',
    email: 'Неверный формат электронной почты',
    password: 'Пароль должен состоять не менее чем из 8 символов',
    passwordMismatch: 'Пароли не совпадают',
    invalidCredentials: 'Неверные учётные данные',
    notUniqueEmail: 'Этот адрес электронной почты уже занят',
  },
  pages: {
    errors: {
      notFound: 'Упс! Кажется, вы заблудились. Такой страницы не существует. Попробуйте вернуться на главную.',
    },
    rooms: {
      rooms: 'Комнаты',
      noContent: 'Ничего не найдено',
    },
  },
};

export default stringsRu;
