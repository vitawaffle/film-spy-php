import LocalizedStrings from 'react-localization';

import stringsEn from './strings-en';
import stringsRu from './strings-ru';

export type StringsTemplate = {
  common: {
    home: string,
    logIn: string,
    logOut: string,
    register: string,
    rooms: string,
  },
};

const strings = new LocalizedStrings({
  en: stringsEn,
  ru: stringsRu,
});

export default strings;
