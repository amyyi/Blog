export function convertTimestamp(articleArray) {
  const timestamp = articleArray.get('editTime');
  const curTimestamp = parseInt(new Date().getTime() / 1000); // 現在時間轉換成timestamp
  const timestampDiff = curTimestamp - timestamp; // 現在時間 - 編輯時間

  const curDate = new Date(curTimestamp * 1000); // 現在時間轉成星期 月份 日期 年份 幾點：幾分：幾秒 GMT+0800(CTS)
  const tmDate = new Date(timestamp * 1000);  // 編輯時間轉成CTS format

  const Y = tmDate.getFullYear();
  const m = tmDate.getMonth() + 1;
  const d = tmDate.getDate();
  const H = tmDate.getHours();
  const i = tmDate.getMinutes();
  const s = tmDate.getSeconds();

  const oneDay = 86400; // 86400是一天的秒數
  const sevenDays = 86400 * 7;

  if (timestampDiff < 60) { // 一分鐘之內
    return '刚刚';
  } else if (timestampDiff < 3600) { // 一小时之內
    return `${Math.floor(timestampDiff / 60)} 分鐘前`;
  } else if (timestampDiff >= 3600 && timestampDiff < oneDay) { // 大於1小時小於1天
    return `${Math.floor(timestampDiff / 3600)} 小時前`;
  } else if (timestampDiff >= oneDay && timestampDiff < sevenDays) { // 大於1天少於7天
    return `${Math.floor(timestampDiff / oneDay)} 天前`;
  } else  {
    return `${Y}-${m}-${d}  ${H}:${i}:${s}`;
  }
}
