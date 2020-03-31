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

export function getPasswordValidationMessage(validationResult) {
  const noRequiredLength = validationResult.tooShort || validationResult.tooLong
  const noRequiredChars = validationResult.noNumericDigit || validationResult.noLowercaseLetter || validationResult.noSpecialChar
  let message = 'Password must '
  if (validationResult.tooShort) {
    message = message.concat(`be at least ${validationResult.minLength} characters long`)
  }
  if (validationResult.tooLong) {
    message = message.concat(`be at most ${validationResult.maxLength} characters long`)
  }
  if (noRequiredChars) {
    if (noRequiredLength) {
      message = message.concat(' and ')
    }
    let requiredCharacters = []
    if (validationResult.noNumericDigit) {
      requiredCharacters.push('one numeric digit')
    }
    if (validationResult.noLowercaseLetter) {
      requiredCharacters.push('one lowercase letter')
    }
    if (validationResult.noUppercaseLetter) {
      requiredCharacters.push('one uppercase lettter')
    }       
    if (validationResult.noSpecialChar) {
      requiredCharacters.push('one special character')
    }  
    message = message.concat(`contain at least ${requiredCharacters.join(', ')}`)
  }
  return message
}