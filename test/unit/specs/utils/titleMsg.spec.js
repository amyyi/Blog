import {validateTitle} from 'src/utils/titleMsg';

describe('utils/titleMsg', () =>{
  describe('titleMsg', () => {
    it('是否有<=15個字', () => {
      expect(validateTitle('abcdefghijklmn')).toBe(undefined);
      expect(validateTitle('12346789707435')).toBe(undefined);
    });
  });
});
