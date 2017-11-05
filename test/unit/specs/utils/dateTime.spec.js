import Immutable from 'immutable';
import {convertTimestamp} from 'src/utils/dateTime';

describe('utils/dateTime', () =>{
  describe('convertTimestamp', () => {
    const dateTime = Date.now();
    const nowTimestamp = parseInt(dateTime / 1000, 10);
    const minTimestamp = parseInt((dateTime / 1000) - 60, 10);
    const hourTimestamp = parseInt((dateTime / 1000) - 3600, 10);
    const dayTimestamp = parseInt((dateTime / 1000) - 86400, 10);
    const seventTimestamp = parseInt((dateTime / 1000) - (86400 * 7), 10);
    const tmDate = new Date(seventTimestamp * 1000);  // 編輯時間轉成CTS format
    const Y = tmDate.getFullYear();
    const m = tmDate.getMonth() + 1;
    const d = tmDate.getDate();
    const H = tmDate.getHours();
    const i = tmDate.getMinutes();
    const s = tmDate.getSeconds();
    it('時間沒超過1分鐘顯示剛剛，超過1分鐘顯示分鐘，超過1小時顯示小時，超過1天顯示1天，超過7天顯示年月日 時分秒', () => {
      expect(convertTimestamp(Immutable.fromJS({editTime: nowTimestamp}))).toBe('刚刚');
      expect(convertTimestamp(Immutable.fromJS({editTime: minTimestamp}))).toBe('1 分鐘前');
      expect(convertTimestamp(Immutable.fromJS({editTime: hourTimestamp}))).toBe('1 小時前');
      expect(convertTimestamp(Immutable.fromJS({editTime: dayTimestamp}))).toBe('1 天前');
      expect(convertTimestamp(Immutable.fromJS({editTime: seventTimestamp}))).toBe(`${Y}-${m}-${d}  ${H}:${i}:${s}`);
    });
  });
});
