import * as validation from 'src/utils/validation';
const titleReg = validation.titleReg;
const required = validation.required;

describe('utils/validation', () =>{
  describe('titleReg', () => {
    it('不可為 “ms(.)”, “mr(.)”,  “mrs(.)” 開頭, 不可為 “mark” or “mary” 結尾', () => {
      expect(titleReg('titlems(.)')).toBe(undefined);
      expect(titleReg('titlemr(.)')).toBe(undefined);
      expect(titleReg('titlemrs(.)')).toBe(undefined);
      expect(titleReg('markTitle')).toBe(undefined);
      expect(titleReg('maryTitle')).toBe(undefined);
    });
  });
  describe('required', () => {
    it('是否為空值', () => {
      expect(required('333333333')).toBe(undefined);
      expect(required('tttttttt')).toBe(undefined);
      expect(required('')).toBe('This field is required.');
    });
  });
});
