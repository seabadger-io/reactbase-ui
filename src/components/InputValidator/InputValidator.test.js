import { isValid } from './InputValidator';

describe('InputValidator', () => {
  describe('required', () => {
    it('should return false if input is empty', () => {
      const input = '';
      const validators = { required: true };
      expect(isValid(input, validators)).toBe(false);
    });
    it('should return false if input is null', () => {
      const input = null;
      const validators = { required: true };
      expect(isValid(input, validators)).toBe(false);
    });
    it('should return true if not required', () => {
      const input = '';
      const validators = { required: false };
      expect(isValid(input, validators)).toBe(true);
    });
    it('should return true if input not empty', () => {
      const input = 'ok';
      const validators = { required: true };
      expect(isValid(input, validators)).toBe(true);
    });
  });
  describe('minLength', () => {
    it('should return false if input is shorter', () => {
      const input = 'abc';
      const validators = { minLength: 4 };
      expect(isValid(input, validators)).toBe(false);
    });
    it('should return false if input is null', () => {
      const input = null;
      const validators = { minLength: 4 };
      expect(isValid(input, validators)).toBe(false);
    });
    it('should return true if input is minLength', () => {
      const input = 'abc';
      const validators = { minLength: 3 };
      expect(isValid(input, validators)).toBe(true);
    });
    it('should return true if input is longer', () => {
      const input = 'abcde';
      const validators = { minLength: 3 };
      expect(isValid(input, validators)).toBe(true);
    });
  });
  describe('maxLength', () => {
    it('should return false if input is longer', () => {
      const input = 'abcd';
      const validators = { maxLength: 3 };
      expect(isValid(input, validators)).toBe(false);
    });
    it('should return true if input is null', () => {
      const input = null;
      const validators = { maxLength: 3 };
      expect(isValid(input, validators)).toBe(true);
    });
    it('should return true if input is maxLength', () => {
      const input = 'abc';
      const validators = { maxLength: 3 };
      expect(isValid(input, validators)).toBe(true);
    });
    it('should return true if input is shorter', () => {
      const input = 'ab';
      const validators = { maxLength: 3 };
      expect(isValid(input, validators)).toBe(true);
    });
  });
  describe('matches', () => {
    it('should return false if no match', () => {
      const input = 'abc';
      const validators = { matches: /def/ };
      expect(isValid(input, validators)).toBe(false);
    });
    it('should return true if matches', () => {
      const input = 'abcde';
      const validators = { matches: /abc/ };
      expect(isValid(input, validators)).toBe(true);
    });
    it('should return false if input is not string', () => {
      const input = null;
      const validators = { matches: /def/ };
      expect(isValid(input, validators)).toBe(false);
    });
  });
});
