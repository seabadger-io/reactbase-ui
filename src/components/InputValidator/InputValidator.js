export const validatorFunctions = {
  required: (input, isRequired) => !isRequired || Boolean(input),
  minLength: (input, minLength) => input && input.length >= minLength,
  maxLength: (input, maxLength) => !input || input.length <= maxLength,
  matches: (input, regExp) => typeof input === 'string' && input.match(regExp),
};

export const isValid = (input, validators) => {
  for (const k of Object.keys(validators)) {
    if (typeof validatorFunctions[k] !== 'function') {
      throw new Error('Invalid validator:', k);
    }
    if (!validatorFunctions[k](input, validators[k])) {
      return false;
    }
  }
  return true;
};
