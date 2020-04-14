import {
  COMMON_CHANGE_LANGUAGE,
} from './constants';
import { changeLanguageAndGetConfig } from '../../../common/i18n';

export function changeLanguage(languageCode) {
  return {
    type: COMMON_CHANGE_LANGUAGE,
    languageCode,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_CHANGE_LANGUAGE:      
      return {
        ...state,
        langConfig: changeLanguageAndGetConfig(action.languageCode)
      };

    default:
      return state;
  }
}
