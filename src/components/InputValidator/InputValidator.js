export const validatorFunctions = {
  required: (input, isRequired) => {
    return !isRequired || Boolean(input);
  },
  minLength: (input, minLength) => {
    return input && input.length >= minLength
  },
  maxLength: (input, maxLength) => {
    return !input || input.length <= maxLength;
  },
  matches: (input, regExp) => {
    return typeof input === 'string' && input.match(regExp);
  },
}

export const validate = (input, validators) => {
  for (const k of Object.keys(validators)) {
    if (typeof validatorFunctions[k] !== 'function') {
      throw new Error('Invalid validator:', k);
    }
    if (!validatorFunctions[k](input, validators[k])) {
      return false;
    }
  }
  return true;
}
