import type { StringsTemplate } from './strings';

const stringsRu: StringsTemplate = {
  common: {
    email: 'Электронная почта',
    home: 'Главная',
    isRemember: 'Запомни меня',
    logIn: 'Войти',
    logOut: 'Выйти',
    register: 'Зарегистрироваться',
    password: 'Пароль',
    rooms: 'Комнаты',
  },
  pages: {
    errors: {
      notFound: 'Упс! Кажется, вы заблудились. Такой страницы не существует. Попробуйте вернуться на главную.',
    },
  },
  validation: {
    invalidCredentials: 'Неправильные учётные данные',
    required: 'Это поле обязательно',
  },
};

export default stringsRu;
