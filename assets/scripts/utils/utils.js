import { CURRENCY } from './enumber';
import { CACHE } from '../global/usual_cache';
const TimeData = {
  days: undefined,
  hours: undefined,
  minutes: undefined,
  seconds: undefined,
  milliseconds: undefined,
};

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export function parseTimeData(time) {
  const days = Math.floor(time / DAY);
  const hours = Math.floor((time % DAY) / HOUR);
  const minutes = Math.floor((time % HOUR) / MINUTE);
  const seconds = Math.floor((time % MINUTE) / SECOND);
  const milliseconds = Math.floor(time % SECOND);

  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
  };
}

export function padZero(num, targetLength = 2) {
  let str = num + '';

  while (str.length < targetLength) {
    str = '0' + str;
  }

  return str;
}

export function parseFormat(timestamp, format) {

  let { days, hours, minutes, seconds, milliseconds } = parseTimeData(timestamp)

  if (format.indexOf('DD') === -1) {
    hours += days * 24;
  } else {
    format = format.replace('DD', padZero(days));
  }

  if (format.indexOf('HH') === -1) {
    minutes += hours * 60;
  } else {
    format = format.replace('HH', padZero(hours));
  }

  if (format.indexOf('mm') === -1) {
    seconds += minutes * 60;
  } else {
    format = format.replace('mm', padZero(minutes));
  }

  if (format.indexOf('ss') === -1) {
    milliseconds += seconds * 1000;
  } else {
    format = format.replace('ss', padZero(seconds));
  }

  if (format.indexOf('S') !== -1) {
    const ms = padZero(milliseconds, 3);

    if (format.indexOf('SSS') !== -1) {
      format = format.replace('SSS', ms);
    } else if (format.indexOf('SS') !== -1) {
      format = format.replace('SS', ms.slice(0, 2));
    } else {
      format = format.replace('S', ms.charAt(0));
    }
  }

  return format;
}

export function CurrencyIdtoName(id) {
  let str = '-'
  if (id !== undefined) {
    CURRENCY.map(item => {
      if (id === item.id) {
        str = item.label
      }
    })
  }
  return str;
}

export function setTimeOutWithTimeStamp(stamp, middleCallback, finalCallback) {//结束时间戳
  let timer = null;
  let now = new Date();
  let nowTime = now.getTime();
  let time = Math.ceil((stamp - nowTime) / 1000);
  if (time > 0) {
    let hour = Math.floor(time / 3600);
    let min = Math.floor((time % 3600) / 60);
    let sec = (time % 3600) % 60
    let timeStr = `${hour >= 10 ? hour : `0${hour}`}:${min >= 10 ? min : `0${min}`}:${sec >= 10 ? sec : `0${sec}`}`
    middleCallback(timeStr, time);
    timer = setInterval(() => {
      time--;
      let hour = Math.floor(time / 3600);
      let min = Math.floor((time % 3600) / 60);
      let sec = (time % 3600) % 60
      let timeStr = `${hour >= 10 ? hour : `0${hour}`}:${min >= 10 ? min : `0${min}`}:${sec >= 10 ? sec : `0${sec}`}`
      middleCallback(timeStr, time);
      if (time <= 0) {
        finalCallback();
        clearInterval(timer);
        timer = null;
      }
    }, 1000);
  }
  return () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
}

export function setTimeOutWithTimeout(stamp, middleCallback, finalCallback) {//剩余时间
  let timer = null;
  let time = Math.ceil(stamp / 1000);
  if (time > 0) {
    let hour = Math.floor(time / 3600);
    let min = Math.floor((time % 3600) / 60);
    let sec = (time % 3600) % 60;
    let timeStr = `${hour >= 10 ? hour : `0${hour}`}:${min >= 10 ? min : `0${min}`}:${sec >= 10 ? sec : `0${sec}`}`
    middleCallback(timeStr, time);
    timer = setInterval(() => {
      time--;
      let hour = Math.floor(time / 3600);
      let min = Math.floor((time % 3600) / 60);
      let sec = (time % 3600) % 60
      let timeStr = `${hour >= 10 ? hour : `0${hour}`}:${min >= 10 ? min : `0${min}`}:${sec >= 10 ? sec : `0${sec}`}`
      middleCallback(timeStr, time);
      if (time <= 0) {
        finalCallback();
        clearInterval(timer);
        timer = null;
      }
    }, 1000);
  }
  return () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
}

export function setTimeOutWithStartEnd(startTime, endTime, middleCallback, finalCallback) {//起止时间 结束时间
  let timer = null;
  let time = startTime;
  if (time > endTime) {
    let hour = Math.floor(time / 3600);
    let min = Math.floor((time % 3600) / 60);
    let sec = (time % 3600) % 60;
    let timeStr = `${hour >= 10 ? hour : `0${hour}`}:${min >= 10 ? min : `0${min}`}:${sec >= 10 ? sec : `0${sec}`}`
    middleCallback(timeStr, time);
    timer = setInterval(() => {
      time = time - 60;
      let hour = Math.floor(time / 3600);
      let min = Math.floor((time % 3600) / 60);
      let sec = (time % 3600) % 60
      let timeStr = `${hour >= 10 ? hour : `0${hour}`}:${min >= 10 ? min : `0${min}`}:${sec >= 10 ? sec : `0${sec}`}`
      middleCallback(timeStr, time);
      if (time <= endTime) {
        finalCallback();
        clearInterval(timer);
        timer = null;
      }
    }, 100);
  }
  return () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
}


export function dateFormat(timestamp, fmt) { // author: meizz
  var o = {
    "M+": timestamp.getMonth() + 1, // 月份
    "d+": timestamp.getDate(), // 日
    "h+": timestamp.getHours(), // 小时
    "m+": timestamp.getMinutes(), // 分
    "s+": timestamp.getSeconds(), // 秒
    "q+": Math.floor((timestamp.getMonth() + 3) / 3), // 季度
    "S": timestamp.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (timestamp.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

export function footerNaviPosition(type) {
  let position = null;
  let reg = CACHE.platform.isIphoneX ? 100 : 70;
  let height = -CACHE.platform.visibleSize.height / 2 + reg;
  switch (type) {
    case 'home':
      position = cc.v2(-200, height);
      break;
    case 'show':
      position = cc.v2(200, height);
      break;
    case 'travel':
      position = cc.v2(0, height);
      break;
    default:
      position = cc.v2(200, height);
      break;
  }
  return position;
}

//防抖
export function debounce(fun, delay) {
  return function (args) {
      let that = this
      let _args = args
      clearTimeout(fun.id)
      fun.id = setTimeout(function () {
          fun.call(that, _args)
      }, delay)
  }
}
  
//截流
export function throttle(fun, delay) {
  let last, deferTimer
  return function () {
      let that = this
      let now = +new Date()
      if (last && now < last + delay) {
          clearTimeout(deferTimer)
          deferTimer = setTimeout(function () {
              last = now
              fun.apply(that)
          }, delay)
      }else {
          last = now
          fun.apply(that)
      }
  }
}

export function vibrate(time=50){
  if (cc.sys.platform !== cc.sys.WECHAT_GAME) {
    return false
  }
 let count=time/15;

 let index=0;

 let interval=setInterval(function(){

   wx.vibrateShort();

   index++;

   if(index>count){

     clearTimeout(interval);

     interval=null;

   }

 },15)
}