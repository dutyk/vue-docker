export function formateTime(time, format) {
  var date = {
    "M+": time.getMonth() + 1,
    "d+": time.getDate(),
    "h+": time.getHours(),
    "m+": time.getMinutes(),
    "s+": time.getSeconds(),
    "q+": Math.floor((time.getMonth() + 3) / 3),
    "S+": time.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}