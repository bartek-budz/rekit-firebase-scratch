const REGEX_EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

export function isValidEmail(value) {
 return REGEX_EMAIL.test(value)
}

const MIN_PASSWORD_LENGTH = 6
const MAX_PASSWORD_LENGTH = 20
const PASSWORD_REQUIRE_NUMERIC_DIGIT = true
const PASSWORD_REQUIRE_LOWERCASE = true
const PASSWORD_REQUIRE_UPPERCASE = true
const PASSWORD_REQUIRE_SPECIAL_CHARS = true

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
  const translationPrefix = 'auth:passwordValidation.'
  const getMessage = key => t('auth:passwordValidation.' + key)

  let message = getMessage('prefix').concat(space)
  if (validationResult.tooShort) {
    message = message.concat(t(translationPrefix + 'requirements.minLength', {minLength: validationResult.minLength}))
  }
  if (validationResult.tooLong) {
    message = message.concat(t(translationPrefix + 'requirements.minLength', {maxLength: validationResult.maxLength}))
  }
  if (noRequiredChars) {
    if (noRequiredLength) {
      message = message.concat(space).concat(getMessage('conjunction')).concat(space)
    }
    let requiredCharacters = []
    if (validationResult.noNumericDigit) {
      requiredCharacters.push(getMessage('requirements.numericDigit'))
    }
    if (validationResult.noLowercaseLetter) {
      requiredCharacters.push(getMessage('requirements.lowercaseLetter'))
    }
    if (validationResult.noUppercaseLetter) {
      requiredCharacters.push(getMessage('requirements.uppercaseLetter'))
    }       
    if (validationResult.noSpecialChar) {
      requiredCharacters.push(getMessage('requirements.specialCharacter'))
    }  
    message = message.concat(getMessage('reqCharacterPrefix')).concat(space).concat(requiredCharacters.join(', '))
  }
  return message
}