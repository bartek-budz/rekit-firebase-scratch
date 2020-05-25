import { APP_BASE_URL } from '../../common/env.js';
import {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  PASSWORD_REQUIRE_NUMERIC_DIGIT,
  PASSWORD_REQUIRE_LOWERCASE,
  PASSWORD_REQUIRE_UPPERCASE,
  PASSWORD_REQUIRE_SPECIAL_CHARS,
  REQUIRE_EMAIL_VERIFICATION
} from './config.js';

const REGEX_EMAIL = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

export function isValidEmail(value) {
 return REGEX_EMAIL.test(value)
}

const REGEX_SPECIAL_CHARS = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/

export function validatePassword(value) {
  let tooShort = MIN_PASSWORD_LENGTH !== -1 && value.length < MIN_PASSWORD_LENGTH
  let tooLong = MAX_PASSWORD_LENGTH !== -1 && value.length > MAX_PASSWORD_LENGTH
  let noNumericDigit = PASSWORD_REQUIRE_NUMERIC_DIGIT && !/\d/.test(value)
  let noLowercaseLetter = PASSWORD_REQUIRE_LOWERCASE && !/[a-z]/.test(value)
  let noUppercaseLetter = PASSWORD_REQUIRE_UPPERCASE && !/[A-Z]/.test(value)
  let noSpecialChar = PASSWORD_REQUIRE_SPECIAL_CHARS && !REGEX_SPECIAL_CHARS.test(value)

  return {
    valid: !(tooShort || tooLong || noNumericDigit || noLowercaseLetter || noUppercaseLetter || noSpecialChar),
    tooShort,
    tooLong,
    noNumericDigit,
    noLowercaseLetter,
    noUppercaseLetter,
    noSpecialChar,
    minLength: MIN_PASSWORD_LENGTH,
    maxLength: MAX_PASSWORD_LENGTH
  }
}

export function getPasswordValidationMessage(validationResult, t) {
  const noRequiredLength = validationResult.tooShort || validationResult.tooLong
  const noRequiredChars = validationResult.noNumericDigit || validationResult.noLowercaseLetter || validationResult.noSpecialChar
  const space = ' '
  const getTranslation = (key, args) => t('auth:validatePassword.'.concat(key), args)

  let message = getTranslation('prefix').concat(space)
  if (validationResult.tooShort) {
    message = message.concat(getTranslation('requirements.minLength', {minLength: validationResult.minLength}))
  }
  if (validationResult.tooLong) {
    message = message.concat(getTranslation('requirements.minLength', {maxLength: validationResult.maxLength}))
  }
  if (noRequiredChars) {
    if (noRequiredLength) {
      message = message.concat(space).concat(getTranslation('conjunction')).concat(space)
    }
    let requiredCharacters = []
    if (validationResult.noNumericDigit) {
      requiredCharacters.push(getTranslation('requirements.numericDigit'))
    }
    if (validationResult.noLowercaseLetter) {
      requiredCharacters.push(getTranslation('requirements.lowercaseLetter'))
    }
    if (validationResult.noUppercaseLetter) {
      requiredCharacters.push(getTranslation('requirements.uppercaseLetter'))
    }       
    if (validationResult.noSpecialChar) {
      requiredCharacters.push(getTranslation('requirements.specialCharacter'))
    }  
    message = message.concat(getTranslation('reqCharacterPrefix')).concat(space).concat(requiredCharacters.join(', '))
  }
  return message
}

export function isFormValid(form) {
  // workaround for react-bootstrap missing feature of custom form item validation
  // setting a Form.Control property isInvalid only changes style of the control, does not impact form validation
  // here we check each form control and fail form validation if the control is assumed ivalid
  let childCount = form && form.childElementCount
  for(let childIndex = 0; childIndex < childCount; childIndex++) {
    let child = form[childIndex]
    let classList = child && child.classList
    if (classList instanceof DOMTokenList && classList.contains('is-invalid')) {
      return false
    }
  }
  return form.checkValidity()
}

export const QUERY_PARAM_NEXT_URL = 'next'

export function linkWithNext(path, nextURL) {
  return nextURL ? `${path}?${QUERY_PARAM_NEXT_URL}=${encodeURIComponent(nextURL)}` : path
}

export function getNextURL(location, nextIsCurrent) {
  return nextIsCurrent
    ? location && location.pathname
    : new URLSearchParams(location && location.search).get(QUERY_PARAM_NEXT_URL)
}

const ERROR_CODES = [
  {firebaseCode: 'auth/email-already-in-use', translationKey: 'emailAlreadyInUse'},
  {firebaseCode: 'auth/invalid-email', translationKey: 'invalidEmail'},
  {firebaseCode: 'auth/weak-password', translationKey: 'weakPassword'},
  {firebaseCode: 'auth/user-disabled', translationKey: 'userDisabled'},
  {firebaseCode: 'auth/user-not-found', translationKey: 'userNotFound'},
  {firebaseCode: 'auth/wrong-password', translationKey: 'wrongPassword'},
  {firebaseCode: 'auth/expired-action-code', translationKey: 'expiredActionCode'},
  {firebaseCode: 'auth/invalid-action-code', translationKey: 'invalidActionCode'},
]

export function translateErrorMessage(t, error) {
  if (error == null) {
    return null
  }
  const foundMapping = error.code && (ERROR_CODES.find(element => element.firebaseCode === error.code))
  const translationKey = 'auth:error.' + (foundMapping ? foundMapping.translationKey : 'default')
  return (t && t(translationKey)) || error.message
}

export function buildActionCodeSettings(nextURL) {
  return nextURL ? {url: APP_BASE_URL + nextURL} : null
}

export function isUserAuthorized(userData, allowUnverified = false) {
  return userData && (!REQUIRE_EMAIL_VERIFICATION || allowUnverified === true || userData.emailVerified)  
}