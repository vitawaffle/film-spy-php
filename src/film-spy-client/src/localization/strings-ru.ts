import type { StringsTemplate } from './strings';

const stringsRu: StringsTemplate = {
  common: {
    confirmPassword: 'Подтвердите пароль',
    email: 'Электронная почта',
    home: 'Главная',
    isRemember: 'Запомни меня',
    logIn: 'Войти',
    logOut: 'Выйти',
    register: 'Зарегистрироваться',
    name: 'Name',
    password: 'Пароль',
    rooms: 'Комнаты',
  },
  pages: {
    errors: {
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
    password: 'Пароль должен быть не меньше 8 символов',
    passwordMismatch: 'Пароли не совпадают',
    required: 'Это поле обязательно',
  },
};

export default stringsRu;
