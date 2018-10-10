export const validatorFunctions = {
  required: (input, isRequired) => !isRequired || Boolean(input),
  minLength: (input, minLength) => Boolean(input && input.length >= minLength),
  maxLength: (input, maxLength) => Boolean(!input || input.length <= maxLength),
  matches: (input, regExp) => Boolean(typeof input === 'string' && regExp.test(input)),
};

export const isValid = (input, validators) => (
  Object.keys(validators)
    .map((k) => {
      if (typeof validatorFunctions[k] !== 'function') {
        throw new Error('Invalid validator:', k);
      }
      return validatorFunctions[k](input, validators[k]);
    })
    .reduce((acc, cur) => acc && cur, true)
);
