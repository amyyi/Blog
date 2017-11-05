import {validateInterge} from 'src/utils/searchInterge';

describe('utils/searchInterge', () =>{
  describe('searchInterge', () => {
    it('不能有非數值或<=>以外的字，<=>後面一定要有數字', () => {
      expect(validateInterge('##8888')).toBeFalsy();
      expect(validateInterge('#$%^&*0000')).toBeFalsy();
      expect(validateInterge('@@@@9999')).toBeFalsy();
      expect(validateInterge('<<')).toBeFalsy();
      expect(validateInterge('=')).toBeFalsy();
      expect(validateInterge('>')).toBeFalsy();
    });
  });
});
