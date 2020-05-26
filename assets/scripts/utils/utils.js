import { CURRENCY } from './enumber'
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

export function parseFormat(format, timeData) {
  let days
  let hours, minutes, seconds, milliseconds

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

export function setTimeOutWithTimeStamp(stamp, middleCallback, finalCallback) {
  let timer = null;
  let now = new Date();
  let nowTime = now.getTime();
  let time = Math.floor((stamp - nowTime) / 1000);
  if (time > 0) {
    timer = setInterval(() => {
      time--;
      let hour = Math.floor(time / 3600);
      let min = Math.floor((time % 3600) / 60);
      let sec = (time % 3600) % 60
      let timeStr = `${hour >= 10 ? hour : `0${hour}`}:${min >= 10 ? min : `0${min}`}:${sec >= 10 ? sec : `0${sec}`}`
      middleCallback(timeStr);
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