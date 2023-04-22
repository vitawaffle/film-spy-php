import LocalizedStrings from 'react-localization';
import stringsEn from './strings-en';
import stringsRu from './strings-ru';

const strings = new LocalizedStrings({
  en: stringsEn,
  ru: stringsRu,
});

export default strings;

export type LocaleTemplate = {
  common: {
    logIn: string,
    home: string,
  },
  pages: {
    errors: {
      notFound: string,
    },
  },
};
